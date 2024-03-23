package org.ssafy.bibibig.quiz.fixture;

import org.ssafy.bibibig.articles.domain.ArticleEntity;

import java.time.LocalDateTime;
import java.util.List;

public class ArticleEntityFixture {
    public static ArticleEntity get(String id, String content, String summary, List<String> keywords) {
        return new ArticleEntity(
                id,
                "1",
                "title",
                "main",
                "sub",
                content,
                "image",
                summary,
                LocalDateTime.of(2014, 2, 13, 11, 30),
                keywords
        );
    }
}
