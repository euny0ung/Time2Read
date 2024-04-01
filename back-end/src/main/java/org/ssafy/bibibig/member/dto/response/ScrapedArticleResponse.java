package org.ssafy.bibibig.member.dto.response;

import org.ssafy.bibibig.articles.dto.Article;

import java.time.LocalDateTime;

public record ScrapedArticleResponse(
        String id,
        String mainCategory,
        String subCategory,
        String title,
        LocalDateTime wroteAt,
        String image,
        String summary

) {

    public static ScrapedArticleResponse from(Article article) {
        return new ScrapedArticleResponse(
                article.id(),
                article.mainCategory(),
                article.subCategory(),
                article.title(),
                article.wroteAt(),
                article.image(),
                article.summary()
        );
    }
}
