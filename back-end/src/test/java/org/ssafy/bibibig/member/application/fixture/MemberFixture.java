package org.ssafy.bibibig.member.application.fixture;

import org.ssafy.bibibig.articles.domain.ArticleEntity;
import org.ssafy.bibibig.member.domain.ScrapedArticleEntity;

import java.time.LocalDateTime;
import java.util.List;

public class MemberFixture {

    public static ArticleEntity getArticleForGrouping(String main) {
        return new ArticleEntity(
                "id",
                "1",
                "title",
                main,
                "sub",
                "content",
                "image",
                "summary",
                LocalDateTime.now(),
                List.of()
        );
    }

    public static ScrapedArticleEntity getScrapedArticleForGrouping(String id) {
        return new ScrapedArticleEntity(
                null,
                id,
                null,
                null
        );
    }
}
