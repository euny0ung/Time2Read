package org.ssafy.bibibig.member.dto;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.ssafy.bibibig.member.domain.MemberEntity;
import org.ssafy.bibibig.member.domain.TimeAttacksEntity;

import java.time.LocalDateTime;

@ToString
@Getter
public class TimeAttack{
    private Long id;
    private String timeAttackTime;
    private LocalDateTime createdAt;
    private MemberEntity member;

    private TimeAttack(String timeAttackTime, LocalDateTime createdAt){
        this.timeAttackTime = timeAttackTime;
        this.createdAt = createdAt;
    }
    public static TimeAttack of(String timeAttackTime, LocalDateTime createdAt){
        return new TimeAttack(timeAttackTime, createdAt);
    }
    public static TimeAttack from(TimeAttacksEntity entity){
        return TimeAttack.of(
          entity.getTimeAttackTime(),
          entity.getCreatedAt()
        );
    }
}
