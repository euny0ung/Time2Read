package org.ssafy.bibibig.articles.api;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.ssafy.bibibig.articles.application.ArticleService;
import org.ssafy.bibibig.articles.dto.ArticleWithQuiz;
import org.ssafy.bibibig.common.dto.Response;
import org.ssafy.bibibig.common.exception.CommonException;
import org.ssafy.bibibig.member.utils.SessionInfo;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/v1/game")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;
    @GetMapping("/{year}")
    public Response<List<ArticleWithQuiz>> getArticleWithQuiz(HttpServletRequest request, @PathVariable int year) {
        long current = System.currentTimeMillis();
        try {
            Long memberId = SessionInfo.getSessionMemberId(request);
            if (memberId <= 6 && year == 2022)
                return Response.success(articleService.getArticleWithQuizForAdmin());
            else
                return Response.success(articleService.getArticleWithQuizzes(year));
        } catch (CommonException e) {
        }

        System.out.println("year : " + year + " -> " + (System.currentTimeMillis() - current));
        return Response.success(articleService.getArticleWithQuizzes(year));
    }

    //TODO: first, second에 관리자 테스트 퀴즈 목업 추가
    @GetMapping("/{year}/first")
    public Response<List<ArticleWithQuiz>> getFirstArticleWithQuiz(HttpServletRequest request, @PathVariable int year) {
        long current = System.currentTimeMillis();
        try {
            Long memberId = SessionInfo.getSessionMemberId(request);
            if (memberId <= 6 && year == 2022)
                return Response.success(articleService.getArticleWithQuizForAdmin());
            else
                return Response.success(articleService.getQuizzes(year));
        } catch (CommonException e) {
        }

        List<ArticleWithQuiz> quizzes = articleService.getQuizzes(year);
        System.out.println("year : " + year + " -> " + (System.currentTimeMillis() - current));
        return Response.success(quizzes);
    }

    @GetMapping("/{year}/second")
    public Response<List<ArticleWithQuiz>> getSecondArticleWithQuiz(@PathVariable int year) {
        return Response.success(articleService.getQuizzesWithOX(year));
    }

}
