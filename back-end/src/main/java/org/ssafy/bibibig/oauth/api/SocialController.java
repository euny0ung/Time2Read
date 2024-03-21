package org.ssafy.bibibig.oauth.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.ssafy.bibibig.common.dto.ErrorCode;
import org.ssafy.bibibig.common.dto.Response;
import org.ssafy.bibibig.oauth.dto.MemberInfo;
import org.ssafy.bibibig.oauth.dto.response.LoginResponse;
import org.ssafy.bibibig.oauth.service.KakaoService;
import org.ssafy.bibibig.oauth.service.SocialService;

import java.util.Map;

@RestController
@RequestMapping("/oauth")
@RequiredArgsConstructor
public class SocialController {

    private final SocialService socialService;
    private final KakaoService kakaoService;

    @GetMapping("/kakao/login")
    public ResponseEntity<?> getToken(@RequestParam String code){
        return kakaoService.requestToken(code);
    }

    @PostMapping("/kakao/account")
    private ResponseEntity<?> checkAuthentication(@RequestBody Map<String, String> requestBody, HttpServletRequest request){
        String token = requestBody.get("token");

        MemberInfo memberInfo = kakaoService.requestAccount(token);
        if(memberInfo==null){
            return Response.error(ErrorCode.INVALID_TOKEN);
        }

        memberInfo = socialService.checkLogin(memberInfo);
        generateSession(memberInfo, request);
        LoginResponse loginResponse = LoginResponse.of(memberInfo.getName());
        return Response.success(loginResponse);
    }

    private void generateSession(MemberInfo memberInfo, HttpServletRequest request){
        HttpSession session = request.getSession(true);
        String sessionId = session.getId(); // 세션에 고유한 ID 설정
        session.setAttribute("sessionId", sessionId);
        session.setAttribute("id", memberInfo.getId());
        session.setMaxInactiveInterval(36000);

    }
}
