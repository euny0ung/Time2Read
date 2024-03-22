package org.ssafy.bibibig.member.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name="scraped_article")
@AllArgsConstructor
@NoArgsConstructor
public class ScrapedArticleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="article_id")
    private Long articleId;
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name="member_id")
    private MemberEntity member;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    public static ScrapedArticleEntity of(Long id, Long articleId, LocalDateTime createdAt, MemberEntity member){
        return new ScrapedArticleEntity(id, articleId, createdAt, member);
    }

}
