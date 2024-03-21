package org.ssafy.bibibig.oauth.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.ssafy.bibibig.common.dto.ErrorCode;
import org.ssafy.bibibig.common.dto.Response;
import org.ssafy.bibibig.common.exception.CommonException;
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

    // TODO: [예지] Refactoring 직접 생성한 Response 타입은 ResponseEntity를 대체하기 위함. 알아서 리팩토링해서 변경할 것
    @GetMapping("/kakao/login")
    public ResponseEntity<?> getToken(@RequestParam String code){
        return kakaoService.requestToken(code);
    }

    @PostMapping("/kakao/account")
    private Response<?> checkAuthentication(@RequestBody Map<String, String> requestBody, HttpServletRequest request){
        String token = requestBody.get("token");
        //TODO: [예지] Refactoring 아래 에러 반환하는 코드는 서비스로 옮길 것
        MemberInfo memberInfo = kakaoService.requestAccount(token);
        if(memberInfo==null){
            throw new CommonException(ErrorCode.INVALID_TOKEN);
            //return Response.error(ErrorCode.INVALID_TOKEN);
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
