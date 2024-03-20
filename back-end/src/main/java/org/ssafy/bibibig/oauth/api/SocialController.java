package org.ssafy.bibibig.oauth.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.ssafy.bibibig.common.dto.Response;
import org.ssafy.bibibig.oauth.dto.MemberInfo;
import org.ssafy.bibibig.oauth.dto.response.LoginResponse;
import org.ssafy.bibibig.oauth.dto.response.TokenResponse;
import org.ssafy.bibibig.oauth.dto.response.UserResponse;
import org.ssafy.bibibig.oauth.service.SocialService;

import java.util.Map;

@RestController
@RequestMapping("/oauth")
@RequiredArgsConstructor
public class SocialController {

    @Value("${oauth.KAKAO_CLIENT_ID}") String CLIENT_ID;
    @Value("${oauth.KAKAO_AUTHORIZE_URL}") String AUTHORIZE_URL;
    @Value("${oauth.KAKAO_REDIRECT_URL}") String REDIRECT_URL;
    @Value("${oauth.KAKAO_TOKEN_REQUEST_URL}") String TOKEN_REQUEST_URL;
    @Value("${oauth.KAKAO_USER_INFO_REQUEST_URL}") String USER_INFO_REQUEST_URL;
    @Value("${oauth.KAKAO_SECURE_RESOURCE}") String SECURE_RESOURCE;

    private final SocialService socialService;

//    @GetMapping("/kakao")
//    public ResponseEntity<?> requestLogin(){
//        // kakao로 login요청
//
//        RestTemplate restTemplate = new RestTemplate();
//
//        return restTemplate.exchange(
//               AUTHORIZE_URL+"?response_type=code&client_id="+CLIENT_ID+"&redirect_uri="+REDIRECT_URL,
//                HttpMethod.GET,
//                null,
//                String.class
//        );
//    }

    @GetMapping("/kakao/login")
    public ResponseEntity<?> getToken(@RequestParam String code){
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", CLIENT_ID);
        body.add("redirect_uri", REDIRECT_URL);
        body.add("code", code);

        // 요청 엔티티 생성
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);

        // 요청 보내기
        return restTemplate.exchange(
                TOKEN_REQUEST_URL,
                HttpMethod.POST,
                requestEntity,
                TokenResponse.class
        );


    }

    @PostMapping("/kakao/account")
    private ResponseEntity<?> checkAuthentication(@RequestBody Map<String, String> requestBody, HttpServletRequest request){
        String token = requestBody.get("token");


        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBearerAuth(token);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("secure_resource", SECURE_RESOURCE);
        body.add("property_keys", "[\"kakao_account.name\", \"kakao_account.email\"]");

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);

        ResponseEntity<UserResponse> responseEntity = restTemplate.exchange(
                USER_INFO_REQUEST_URL,
                HttpMethod.GET,
                requestEntity,
                UserResponse.class
        );
        UserResponse userResponse = responseEntity.getBody();
        if(userResponse==null){
            // token 이상
            return ResponseEntity.ok("토큰 만료");
        }

        MemberInfo memberInfo = MemberInfo.of(null,userResponse.getKakaoAccount().getName(), userResponse.getKakaoAccount().getEmail());

        // DB에 회원이 없으면 회원가입 처리
        memberInfo = socialService.checkLogin(memberInfo);

        // 세션 발급
        generateSession(memberInfo, request);

        LoginResponse loginResponse = LoginResponse.of(memberInfo.getName());
        return Response.success(loginResponse);
    }

    private void generateSession(MemberInfo memberInfo, HttpServletRequest request){
        HttpSession session = request.getSession();
        String sessionId = session.getId(); // 세션에 고유한 ID 설정
        session.setAttribute("sessionId", sessionId);
        session.setAttribute("id", memberInfo.getId());

    }
}
