package org.ssafy.bibibig.result.dto.response;

import org.ssafy.bibibig.articles.dto.Article;

public record RelatedArticleResponse(
        String relatedArticleId,
        Article article
){
}