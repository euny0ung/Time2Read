package org.ssafy.bibibig.result.api;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.ssafy.bibibig.common.dto.Response;
import org.ssafy.bibibig.result.application.ResultService;
import org.ssafy.bibibig.result.dto.RelatedArticle;
import org.ssafy.bibibig.result.dto.response.RelatedArticleResponse;

import java.util.List;

@RestController
@RequestMapping("/v1/result")
@RequiredArgsConstructor
public class ResultController {

    private final ResultService resultService;

    @PostMapping("/related")
    Response<List<RelatedArticleResponse>> getRelatedArticles(@RequestBody RelatedArticle relatedArticle){
        return Response.success(resultService.getRelatedArticles(relatedArticle.getId()));
    }
}
