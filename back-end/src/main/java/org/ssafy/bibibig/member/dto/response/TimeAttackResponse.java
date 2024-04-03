package org.ssafy.bibibig.member.dto.response;

import java.time.LocalDateTime;

public record TimeAttackResponse(
        int timeAttackTime,
        LocalDateTime playDate
) {
    public static TimeAttackResponse of(int timeAttackTime, LocalDateTime playDate) {
        return new TimeAttackResponse(timeAttackTime, playDate);
    }
}
