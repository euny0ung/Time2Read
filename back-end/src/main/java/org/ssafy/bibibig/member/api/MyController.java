package org.ssafy.bibibig.member.api;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.ssafy.bibibig.common.dto.ErrorCode;
import org.ssafy.bibibig.common.dto.Response;
import org.ssafy.bibibig.member.application.ScrapService;
import org.ssafy.bibibig.member.dto.response.TokenResponse;
import org.ssafy.bibibig.member.utils.SessionInfo;

@RestController
@RequestMapping("/v1/my")
@RequiredArgsConstructor
public class MyController {

    private final ScrapService scrapService;


    @PutMapping("/scraped-articles/{articleId}/{status}")
    public Response<?> changeScrapStatus(HttpServletRequest request, @PathVariable(name = "articleId") String articleId, @PathVariable(name = "status") boolean status){
        Long memberId = SessionInfo.getSessionMemberId(request);
        scrapService.changeScrapStatus(articleId, status, memberId);
        return Response.success();
    }
}
