package org.ssafy.bibibig.result.dto;

import org.ssafy.bibibig.articles.dto.Article;

import java.util.List;

public record RelatedArticle(
        String relatedArticleId,
        List<Article> article
) {
}
