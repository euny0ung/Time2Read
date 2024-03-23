package org.ssafy.bibibig.result.dto.response;

import org.ssafy.bibibig.articles.dto.Article;

import java.util.List;

public record RelatedArticleResponse(
        String relatedArticleId,
        List<Article> article
) {
}