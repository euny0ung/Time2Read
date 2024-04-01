package org.ssafy.bibibig.member.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "member")
public class MemberEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    private String name;
    @NotNull
    private String email;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "solved_categories_id")
    @NotNull
    private SolvedCategoriesEntity solvedCategoriesEntity;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BadgeEntity> badges;
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ScrapedArticleEntity> scraps;
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<SolvedRecordsEntity> solvedRecords;
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TimeAttacksEntity> timeAttacks;

    public MemberEntity(Long id, String name, String email, LocalDateTime createdAt, SolvedCategoriesEntity solvedCategoriesEntity) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
        this.solvedCategoriesEntity = solvedCategoriesEntity;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public static MemberEntity of(Long id, String name, String email, LocalDateTime createdAt, SolvedCategoriesEntity solvedCategoriesEntity) {
        return new MemberEntity(id, name, email, createdAt, solvedCategoriesEntity);
    }
}
