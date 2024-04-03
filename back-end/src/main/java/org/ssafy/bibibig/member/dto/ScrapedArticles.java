package org.ssafy.bibibig.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.ssafy.bibibig.member.domain.MemberEntity;
import org.ssafy.bibibig.member.domain.ScrapedArticleEntity;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ScrapedArticles {
    private Long id;
    private String articleId;
    private LocalDateTime createdAt;
    private MemberEntity member;

    public static ScrapedArticles of(Long id, String articleId, LocalDateTime createdAt, MemberEntity member) {
        return new ScrapedArticles(id, articleId, createdAt, member);
    }

    public static ScrapedArticles from(ScrapedArticleEntity entity) {
        return ScrapedArticles.of(
                entity.getId(),
                entity.getArticleId(),
                entity.getCreatedAt(),
                entity.getMember()
        );
    }

    public ScrapedArticleEntity toEntity() {
        return ScrapedArticleEntity.of(id, articleId, createdAt, member);
    }

}
