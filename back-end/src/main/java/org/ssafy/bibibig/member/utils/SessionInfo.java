package org.ssafy.bibibig.member.utils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.ssafy.bibibig.common.dto.ErrorCode;
import org.ssafy.bibibig.common.exception.CommonException;

@Slf4j
@Component
public class SessionInfo {
    public static Long getSessionMemberId(HttpServletRequest request) {
        String clientSessionId = getSessionIdFromClient(request);
        String serverSessionId = getSessionIdFromServer(request);

        if (clientSessionId != null && serverSessionId != null && clientSessionId.equals(serverSessionId)) {
            return getMemberId(request);
        } else {
            log.error("clientSessionId : " + clientSessionId + "serverSessionId: " + serverSessionId);
            throw new CommonException(ErrorCode.INVALID_TOKEN);
        }
    }

    private static String getSessionIdFromClient(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("JSESSIONID")) { // 세션 쿠키의 이름을 설정한대로 바꿔주세요.
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    private static String getSessionIdFromServer(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            return session.getId();
        }
        return session.getId();
    }

    private static Long getMemberId(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        return (Long) session.getAttribute("memberId");
    }
}
