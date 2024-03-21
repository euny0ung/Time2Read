package org.ssafy.bibibig.articles.dto;

import org.ssafy.bibibig.articles.domain.ArticleEntity;
import org.ssafy.bibibig.quiz.dto.Quiz;

public record ArticleWithQuiz(
        String id,
        String title,
        String content,
        String image,
        Quiz quiz
) {
    public static ArticleWithQuiz from(Article article, Quiz quiz) {
        return new ArticleWithQuiz(
                article.id(),
                article.title(),
                article.content(),
                article.image(),
                quiz
        );
    }
}
