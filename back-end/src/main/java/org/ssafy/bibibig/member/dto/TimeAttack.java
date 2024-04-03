package org.ssafy.bibibig.member.dto;

import lombok.Getter;
import lombok.ToString;
import org.ssafy.bibibig.member.domain.TimeAttacksEntity;

import java.time.LocalDateTime;

@ToString
@Getter
public class TimeAttack {
    private Long id;
    private int timeAttackTime;
    private LocalDateTime createdAt;
    private Member member;

    private TimeAttack(int timeAttackTime, LocalDateTime createdAt) {
        this.timeAttackTime = timeAttackTime;
        this.createdAt = createdAt;
    }

    private TimeAttack(int timeAttackTime, LocalDateTime createdAt, Member member) {
        this.timeAttackTime = timeAttackTime;
        this.createdAt = createdAt;
        this.member = member;
    }

    public static TimeAttack of(int timeAttackTime, LocalDateTime createdAt) {
        return new TimeAttack(timeAttackTime, createdAt);
    }

    public static TimeAttack of(int timeAttackTime, LocalDateTime createdAt, Member member) {
        return new TimeAttack(timeAttackTime, createdAt, member);
    }

    public static TimeAttack from(TimeAttacksEntity entity) {
        return TimeAttack.of(
                entity.getTimeAttackTime(),
                entity.getCreatedAt()
        );
    }

    public TimeAttacksEntity toEntity() {
        return TimeAttacksEntity.of(
                id,
                timeAttackTime,
                createdAt,
                member.toEntity(null)
        );
    }
}
