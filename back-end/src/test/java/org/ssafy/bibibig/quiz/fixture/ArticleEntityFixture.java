package org.ssafy.bibibig.quiz.fixture;

import org.ssafy.bibibig.articles.domain.ArticleEntity;

import java.util.Set;

public class ArticleEntityFixture {
    public static ArticleEntity get(String content, Set<String> keywords) {
        return new ArticleEntity(
                "id",
                "1",
                "title",
                "main",
                "sub",
                content,
                "image",
                "summary",
                "wroteAt",
                keywords
        );
    }
}
