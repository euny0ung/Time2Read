package org.ssafy.bibibig.articles.api;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.ssafy.bibibig.articles.application.ArticleService;
import org.ssafy.bibibig.articles.dto.ArticleWithQuiz;
import org.ssafy.bibibig.articles.dto.KeywordTerms;
import org.ssafy.bibibig.common.dto.Response;

import java.util.List;

@RestController
@RequestMapping("/v1/game")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping("/{articleId}")
    public Response<ArticleWithQuiz> getArticleWithQuiz(@PathVariable String articleId) {
        return Response.success(articleService.getArticleWithQuiz(articleId));
    }

    @GetMapping("/result/summary")
    public Response<List<KeywordTerms>> getTopKeywordsByYear(@RequestParam int year) {
        return Response.success(articleService.getTopKeywordsByYear(year));
    }

}
