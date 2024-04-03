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
@RequestMapping("/v1/my")
@RequiredArgsConstructor
public class MyController {
    private final SolvedCategoryService solvedCategoryService;
    private final TimeAttackRecordService timeAttackRecordService;
    private final ScrapService scrapService;
    private final BadgeService badgeService;

    @PutMapping("/scraped-articles/{articleId}/{status}")
    public Response<?> changeScrapStatus(HttpServletRequest request, @PathVariable(name = "articleId") String articleId, @PathVariable(name = "status") boolean status) {
        Long memberId = SessionInfo.getSessionMemberId(request);
        scrapService.changeScrapStatus(articleId, status, memberId);
        return Response.success();
    }

    @GetMapping("/scraped-articles")
    public Response<ScrapedArticlesByMainCateResponse> getScrapedArticles(HttpServletRequest request) {
        Long memberId = SessionInfo.getSessionMemberId(request);
        return Response.success(scrapService.getScrapedArticles(memberId));
    }

    @GetMapping("/scraped-article/{articleId}")
    public Response<ScrapedArticleResponse> getScrapedArticle(@PathVariable(name = "articleId") String articleId) {
        return Response.success(ScrapedArticleResponse.from(scrapService.getScrapedArticle(articleId)));
    }

    @GetMapping("/solved")
    public Response<SolvedCategoryResponse> getSolvedCountByCategory(HttpServletRequest request) {
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
    public Response<List<BadgeResponse>> getBadges(HttpServletRequest request) {
        Long memberId = SessionInfo.getSessionMemberId(request);
        return Response.success(badgeService.getBadges(memberId));
    }

    @GetMapping("/records")
    public Response<List<TimeAttackResponse>> getRecords(HttpServletRequest request) {
        Long memberId = SessionInfo.getSessionMemberId(request);
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
