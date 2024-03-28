package org.ssafy.bibibig.articles.dto;

import org.ssafy.bibibig.articles.domain.ArticleEntity;

import java.time.LocalDateTime;
import java.util.List;

public record Article(
        String id,
        String haniId,
        String title,
        String mainCategory,
        String subCategory,
        String content,
        String image,
        String summary,
        LocalDateTime wroteAt,
        List<String> keywords
) {
    public static Article from(ArticleEntity entity) {
        return new Article(
                entity.getId(),
                entity.getHaniId(),
                entity.getTitle(),
                entity.getMainCategory(),
                entity.getSubCategory(),
                entity.getContent(),
                entity.getImage(),
                entity.getSummary(),
                entity.getWroteAt(),
                entity.getKeywords()
        );
    }
}
