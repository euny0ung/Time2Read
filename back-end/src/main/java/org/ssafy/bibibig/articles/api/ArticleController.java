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

    @GetMapping("/{year}")
    public Response<List<ArticleWithQuiz>> getArticleWithQuiz(@PathVariable int year) {
        return Response.success(articleService.getArticleWithQuizes(year));
    }

    @GetMapping("/result/summary")
    public Response<List<KeywordTerms>> getTopKeywordsByYear(@RequestParam int year) {
        return Response.success(articleService.getTopKeywordsByYear(year));
    }

}
