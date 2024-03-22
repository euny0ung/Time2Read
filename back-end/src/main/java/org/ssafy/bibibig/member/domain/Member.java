package org.ssafy.bibibig.member.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
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

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "solved_categories_id")
    private SolvedCategories solvedCategories;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Badge> badges;
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ScrapedArticle> scraps;
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<SolvedRecords> solvedRecords;
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TimeAttacks> timeAttacks;
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

    @Entity
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Table(name="badge")
    public static class Badge {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id")
        private Long id;
        private int year;
        private int count;
        @Column(name = "created_at")
        private LocalDateTime createdAt;

        @ManyToOne
        @JoinColumn(name = "member_id")
        private Member member;

        @PrePersist
        protected void onCreate() {
            createdAt = LocalDateTime.now();
        }

    }
}
