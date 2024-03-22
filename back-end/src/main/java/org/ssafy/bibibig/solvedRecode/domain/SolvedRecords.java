package org.ssafy.bibibig.solvedRecode.domain;

import jakarta.persistence.*;
import org.ssafy.bibibig.oauth.domain.Member;

import java.time.LocalDateTime;

@Entity
@Table(name = "solved_records")
public class SolvedRecords {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "play_year")
    private int playYear;
    @Column(name="main_category")
    private String mainCategory;
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name="member_id")
    private Member member;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
