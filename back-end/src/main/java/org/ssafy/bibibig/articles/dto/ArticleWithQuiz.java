package org.ssafy.bibibig.articles.dto;

import org.ssafy.bibibig.quiz.dto.Quiz;

import java.time.LocalDateTime;

public record ArticleWithQuiz(
        String id,
        String title,
        String mainCategory,
        String subCategory,
        String content,
        String image,
        LocalDateTime wroteAt,
        Quiz quiz
) {
    public static ArticleWithQuiz from(CategoryType category, Article article, Quiz quiz) {
        return new ArticleWithQuiz(
                article.id(),
                article.title(),
                category.name(),
                article.subCategory(),
                article.content(),
                article.image(),
                article.wroteAt(),
                quiz
        );
    }

}
