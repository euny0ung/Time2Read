package org.ssafy.bibibig.member.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.ssafy.bibibig.common.dto.Response;
import org.ssafy.bibibig.member.dto.MemberInfo;
import org.ssafy.bibibig.member.dto.response.LoginResponse;
import org.ssafy.bibibig.member.application.KakaoService;
import org.ssafy.bibibig.member.application.SocialService;
import org.ssafy.bibibig.member.dto.response.TokenResponse;

import java.util.Map;

@RestController
@RequestMapping("/oauth")
@RequiredArgsConstructor
public class SocialController {

    private final SocialService socialService;
    private final KakaoService kakaoService;

    @GetMapping("/kakao/login")
    public Response<TokenResponse> getToken(@RequestParam String code){
        return Response.success(kakaoService.requestToken(code));
    }

    @PostMapping("/kakao/account")
    private Response<?> checkAuthentication(@RequestBody Map<String, String> requestBody, HttpServletRequest request){
        String token = requestBody.get("token");
        MemberInfo memberInfo = kakaoService.requestAccount(token);

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
