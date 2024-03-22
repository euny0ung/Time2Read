package org.ssafy.bibibig.scrap.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.elasticsearch.monitor.os.OsStats;
import org.ssafy.bibibig.badge.domain.Badge;
import org.ssafy.bibibig.oauth.domain.Member;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="scraped_article")
@AllArgsConstructor
@NoArgsConstructor
public class Scrap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="article_id")
    private Long articleId;
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name="member_id")
    private Member member;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    public static Scrap of(Long id, Long articleId, LocalDateTime createdAt, Member member){
        return new Scrap(id, articleId, createdAt, member);
    }

}
