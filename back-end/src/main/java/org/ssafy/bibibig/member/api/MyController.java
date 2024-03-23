package org.ssafy.bibibig.member.api;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.ssafy.bibibig.common.dto.Response;
import org.ssafy.bibibig.member.application.ScrapService;
import org.ssafy.bibibig.member.application.SolvedCategoryService;
import org.ssafy.bibibig.member.dto.response.ScrapedArticlesByMainCateResponse;
import org.ssafy.bibibig.member.dto.response.SolvedCategory;
import org.ssafy.bibibig.member.dto.response.SolvedCategoryResponse;
import org.ssafy.bibibig.member.utils.SessionInfo;

@RestController
@RequestMapping("/v1/my")
@RequiredArgsConstructor
public class MyController {

    private final ScrapService scrapService;
    private final SolvedCategoryService solvedCategoryService;


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
    public Response<?> getSolvedCountByCategory(HttpServletRequest request){
//        Long memberId = SessionInfo.getSessionMemberId(request);
        SolvedCategory solvedCategory = solvedCategoryService.getSolvedCategory(1L);
        return Response.success(SolvedCategoryResponse.of(
                solvedCategory.politic(),
                solvedCategory.culture(),
                solvedCategory.economy(),
                solvedCategory.society(),
                solvedCategory.sports(),
                solvedCategory.international()
        ));
    }
}
