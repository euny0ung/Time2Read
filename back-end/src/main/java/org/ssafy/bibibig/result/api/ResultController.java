package org.ssafy.bibibig.result.api;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.ssafy.bibibig.articles.dto.KeywordTerms;
import org.ssafy.bibibig.common.dto.Response;
import org.ssafy.bibibig.result.application.ResultService;
import org.ssafy.bibibig.result.dto.request.RelatedArticleRequest;
import org.ssafy.bibibig.result.dto.response.RelatedArticleResponse;

import java.util.List;

@RestController
@RequestMapping("/v1/result")
@RequiredArgsConstructor
public class ResultController {

    private final ResultService resultService;

    @PostMapping("/related")
    public Response<List<RelatedArticleResponse>> getRelatedArticlesFromPast(@RequestBody RelatedArticleRequest request) {
        return Response.success(
                resultService.getRelatedArticlesFromPast(request.getId())
                        .stream()
                        .map(RelatedArticleResponse::from)
                        .toList());
    }

    @GetMapping("/related/{articleId}")
    public Response<RelatedArticleResponse> getRelatedArticlesTop5(@PathVariable String articleId) {
        return Response.success(
                new RelatedArticleResponse(articleId, resultService.getRelatedArticlesTop5(articleId))
        );
    }

    @GetMapping("/summary")
    public Response<List<KeywordTerms>> getTopKeywordsByYear(@RequestParam int year) {
        return Response.success(resultService.getTopKeywordsByYear(year));
    }

}
