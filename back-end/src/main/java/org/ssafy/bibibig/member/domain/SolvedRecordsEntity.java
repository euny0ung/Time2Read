package org.ssafy.bibibig.member.domain;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "solved_records")
public class SolvedRecordsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "play_year")
    private int playYear;
    @Column(name = "main_category")
    private String mainCategory;
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private MemberEntity member;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
