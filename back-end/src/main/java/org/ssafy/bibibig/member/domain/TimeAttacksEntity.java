package org.ssafy.bibibig.member.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "time_attacks")
public class TimeAttacksEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "time_attack_time")
    private int timeAttackTime;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @ManyToOne
    @JoinColumn(name = "member_id")
    private MemberEntity member;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public static TimeAttacksEntity of(Long id, int timeAttackTime, LocalDateTime createdAt, MemberEntity member) {
        return new TimeAttacksEntity(id, timeAttackTime, createdAt, member);
    }

}
