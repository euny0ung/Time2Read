package org.ssafy.bibibig.oauth.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.ssafy.bibibig.badge.domain.Badge;
import org.ssafy.bibibig.scrap.domain.Scrap;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="member")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String name;

    private String email;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // todo 카테고리별 해결 개수 저장

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Badge> badges;
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Scrap> scraps;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    private Member(Long id, String name, String email, LocalDateTime createdAt){
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
    }
    public static Member of(Long id, String name, String email, LocalDateTime createdAt){
        return new Member(id, name, email, createdAt);
    }
    public static Member of(Long id, String name, String email, LocalDateTime createdAt, List<Badge>badges, List<Scrap>scraps){
        return new Member(id, name, email, createdAt, badges, scraps);
    }

}
