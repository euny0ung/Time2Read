package org.ssafy.bibibig.result.dto.response;

import org.ssafy.bibibig.articles.dto.Article;
import org.ssafy.bibibig.result.dto.RelatedArticle;

import java.util.List;

public record RelatedArticleResponse(
        String relatedArticleId,
        List<Article> article
) {
    public static RelatedArticleResponse from(RelatedArticle relatedArticle) {
        return new RelatedArticleResponse(
                relatedArticle.relatedArticleId(),
                relatedArticle.article()
        );
    }

}