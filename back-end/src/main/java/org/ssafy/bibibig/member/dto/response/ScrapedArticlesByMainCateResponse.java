package org.ssafy.bibibig.member.dto.response;

import org.ssafy.bibibig.articles.domain.ArticleEntity;
import org.ssafy.bibibig.common.utils.MainCategory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public record ScrapedArticlesByMainCateResponse(
        Map<String, List<ArticleEntity>> data
) {

    public static ScrapedArticlesByMainCateResponse from(Map<String, List<ArticleEntity>> map) {
        Map<String, List<ArticleEntity>> data = new HashMap<>();

        for (String key : map.keySet()) {
            data.put(MainCategory.findByKorean(key), map.get(key));
        }
        return new ScrapedArticlesByMainCateResponse(data);
    }
}
