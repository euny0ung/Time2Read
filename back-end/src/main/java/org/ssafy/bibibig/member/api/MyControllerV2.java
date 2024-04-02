package org.ssafy.bibibig.member.api;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.ssafy.bibibig.common.dto.Response;
import org.ssafy.bibibig.member.application.BadgeService;
import org.ssafy.bibibig.member.application.ScrapService;
import org.ssafy.bibibig.member.application.SolvedCategoryService;
import org.ssafy.bibibig.member.application.TimeAttackRecordService;
import org.ssafy.bibibig.member.dto.request.GameResultRequest;
import org.ssafy.bibibig.member.dto.response.*;
import org.ssafy.bibibig.member.utils.SessionInfo;

import java.util.List;

@RestController
@RequestMapping("/v2/my")
@RequiredArgsConstructor
public class MyControllerV2 {
    private final SolvedCategoryService solvedCategoryService;
    private final TimeAttackRecordService timeAttackRecordService;
    private final ScrapService scrapService;
    private final BadgeService badgeService;

    @PutMapping("/scraped-articles/{articleId}/{status}/{id}")
    public Response<?> changeScrapStatus(@PathVariable(name = "articleId") String articleId, @PathVariable(name = "status") boolean status, @PathVariable(name = "id") Long memberId) {
//        Long memberId = SessionInfo.getSessionMemberId(request);
        scrapService.changeScrapStatus(articleId, status, memberId);
        return Response.success();
    }

    @GetMapping("/scraped-articles/{id}")
    public Response<ScrapedArticlesByMainCateResponse> getScrapedArticles(@PathVariable(name = "id") Long memberId) {
//        Long memberId = SessionInfo.getSessionMemberId(request);
        return Response.success(scrapService.getScrapedArticles(memberId));
    }

    @GetMapping("/scraped-article/{articleId}")
    public Response<ScrapedArticleResponse> getScrapedArticle(@PathVariable(name = "articleId") String articleId) {
        return Response.success(ScrapedArticleResponse.from(scrapService.getScrapedArticle(articleId)));
    }

    @GetMapping("/solved/{id}")
    public Response<SolvedCategoryResponse> getSolvedCountByCategory(@PathVariable(name = "id") Long memberId) {
//        Long memberId = SessionInfo.getSessionMemberId(request);
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

    @GetMapping("/badges/{id}")
    public Response<List<BadgeResponse>> getBadges(@PathVariable(name = "id") Long memberId) {
//        Long memberId = SessionInfo.getSessionMemberId(request);
        return Response.success(badgeService.getBadges(memberId));
    }

    @GetMapping("/records/{id}")
    public Response<List<TimeAttackResponse>> getRecords(HttpServletRequest request,@PathVariable(name = "id") Long memberId) {
//        Long memberId = SessionInfo.getSessionMemberId(request);
        return Response.success(timeAttackRecordService.getRecords(memberId));

    }

    // 타임 어택 기록 저장
    @PostMapping("/result")
    @Transactional
    public Response<?> saveGameResult(HttpServletRequest request, @RequestBody GameResultRequest gameResultRequest) {
        Long memberId = SessionInfo.getSessionMemberId(request);
        badgeService.saveBadge(memberId, gameResultRequest.getYear());
        solvedCategoryService.saveSolvedCategory(memberId, gameResultRequest.getSolvedCategoryRequest());
        timeAttackRecordService.saveRecord(memberId, gameResultRequest.getTimeAttackTime());
        return Response.success();
    }
}
