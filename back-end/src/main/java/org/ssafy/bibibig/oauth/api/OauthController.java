package org.ssafy.bibibig.oauth.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.ssafy.bibibig.oauth.response.TokenResponse;
import org.ssafy.bibibig.oauth.response.UserResponse;

@RestController
@RequestMapping("/oauth")
public class OauthController {

    @Value("${oauth.KAKAO_CLIENT_ID}") String CLIENT_ID;
    @Value("${oauth.KAKAO_REDIRECT_URL}") String REDIRECT_URL;
    @Value("${oauth.KAKAO_TOKEN_REQUEST_URL}") String TOKEN_REQUEST_URL;
    @Value("${oauth.KAKAO_USER_INFO_REQUEST_URL}") String USER_INFO_REQUEST_URL;
    @Value("${oauth.KAKAO_SECURE_RESOURCE}") String SECURE_RESOURCE;

    @GetMapping("/token")
    public ResponseEntity<?> getCode(@RequestParam(required = false) String code){
        if(code==null){
            return ResponseEntity.ok("로그인 취소");
        }

        TokenResponse tokenResponse = requestToken(code);

        if(tokenResponse.getAccessToken()==null){
            return ResponseEntity.ok("로그인 실패");
        }

        // 사용자 정보 조회
        UserResponse userResponse = getUserInfo(tokenResponse.getAccessToken());

        String name = userResponse.getKakaoAccount().getName();
        String email = userResponse.getKakaoAccount().getEmail();


        return ResponseEntity.ok("로그인 성공");
    }

    private UserResponse getUserInfo(String access_token){
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBearerAuth(access_token);

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


        return responseEntity.getBody();
    }

    private TokenResponse requestToken (String code){
        // RestTemplate로 요청보내기
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
        ResponseEntity<TokenResponse> responseEntity = restTemplate.exchange(
                TOKEN_REQUEST_URL,
                HttpMethod.POST,
                requestEntity,
                TokenResponse.class
        );

        return responseEntity.getBody();
    }
}
