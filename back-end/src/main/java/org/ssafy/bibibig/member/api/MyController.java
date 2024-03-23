package org.ssafy.bibibig.member.api;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.ssafy.bibibig.common.dto.Response;
import org.ssafy.bibibig.member.application.BadgeService;
import org.ssafy.bibibig.member.application.ScrapService;
import org.ssafy.bibibig.member.application.SolvedCategoryService;
import org.ssafy.bibibig.member.dto.response.BadgeResponse;
import org.ssafy.bibibig.member.dto.response.ScrapedArticlesByMainCateResponse;
import org.ssafy.bibibig.member.dto.response.SolvedCategory;
import org.ssafy.bibibig.member.dto.response.SolvedCategoryResponse;
import org.ssafy.bibibig.member.utils.SessionInfo;

import java.util.List;

@RestController
@RequestMapping("/v1/my")
@RequiredArgsConstructor
public class MyController {

    private final ScrapService scrapService;
    private final SolvedCategoryService solvedCategoryService;
    private final BadgeService badgeService;


    @PutMapping("/scraped-articles/{articleId}/{status}")
    public Response<?> changeScrapStatus(HttpServletRequest request, @PathVariable(name = "articleId") String articleId, @PathVariable(name = "status") boolean status){
        Long memberId = SessionInfo.getSessionMemberId(request);
        scrapService.changeScrapStatus(articleId, status, memberId);
        return Response.success();
    }

    @GetMapping("/scraped-articles")
    public Response<ScrapedArticlesByMainCateResponse> getScrapedArticles(HttpServletRequest request){
        Long memberId = SessionInfo.getSessionMemberId(request);
        return Response.success(scrapService.getScrapedArticles(memberId));
    }

    @GetMapping("/solved")
    public Response<SolvedCategoryResponse> getSolvedCountByCategory(HttpServletRequest request){
        Long memberId = SessionInfo.getSessionMemberId(request);
        SolvedCategory solvedCategory = solvedCategoryService.getSolvedCategory(memberId);
        return Response.success(SolvedCategoryResponse.of(
                solvedCategory.politic(),
                solvedCategory.culture(),
                solvedCategory.economy(),
                solvedCategory.society(),
                solvedCategory.sports(),
                solvedCategory.international()
        ));
    }

    @GetMapping("/badges")
    public Response<?> getBadges(HttpServletRequest request){
//        Long memberId = SessionInfo.getSessionMemberId(request);
        List<BadgeResponse> badges = badgeService.getBadges(1L);
        return Response.success(badges);
    }
}
