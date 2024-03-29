package org.ssafy.bibibig.articles.api;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.ssafy.bibibig.articles.application.ArticleService;
import org.ssafy.bibibig.articles.dto.ArticleWithQuiz;
import org.ssafy.bibibig.articles.dto.response.GameResponse;
import org.ssafy.bibibig.common.dto.Response;
import org.ssafy.bibibig.quiz.dto.Quiz;

import java.util.List;

@RestController
@RequestMapping("/v1/game")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping("/{year}")
    public Response<List<ArticleWithQuiz>> getArticleWithQuiz(@PathVariable int year) {
        return Response.success(articleService.getArticleWithQuizzes(year));
    }

    @GetMapping("/{year}/first")
    public Response<List<ArticleWithQuiz>> getFirstArticleWithQuiz(@PathVariable int year) {
        return Response.success(articleService.getQuizzes(year));
    }

    @GetMapping("/{year}/second")
    public Response<List<ArticleWithQuiz>> getSecondArticleWithQuiz(@PathVariable int year) {
        return Response.success(articleService.getQuizzesWithOX(year));
    }
}
