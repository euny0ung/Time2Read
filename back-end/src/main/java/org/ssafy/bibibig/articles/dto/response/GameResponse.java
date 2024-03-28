package org.ssafy.bibibig.articles.dto.response;

import org.ssafy.bibibig.articles.dto.Article;
import org.ssafy.bibibig.articles.dto.CategoryType;
import org.ssafy.bibibig.quiz.dto.Quiz;

import java.time.LocalDateTime;

public record GameResponse(
        String id,
        String title,
        CategoryType mainCategory,
        String subCategory,
        String content,
        String image,
        LocalDateTime wroteAt,
        Quiz quiz
) {

    public static GameResponse from(Article article,
                                    Quiz quiz) {
        return new GameResponse(
                article.id(),
                article.title(),
                CategoryType.findByName(article.mainCategory()),
                article.subCategory(),
                article.content(),
                article.image(),
                article.wroteAt(),
                quiz
        );
    }
}
