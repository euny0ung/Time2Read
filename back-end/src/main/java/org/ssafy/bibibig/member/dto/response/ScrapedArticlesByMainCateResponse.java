package org.ssafy.bibibig.member.dto.response;

import org.ssafy.bibibig.articles.domain.ArticleEntity;

import java.util.List;
import java.util.Map;

public record ScrapedArticlesByMainCateResponse(
        Map<String, List<ArticleEntity>> map
) {

    public static ScrapedArticlesByMainCateResponse from(Map<String, List<ArticleEntity>> map) {
        return new ScrapedArticlesByMainCateResponse(map);
    }
}
