package org.ssafy.bibibig.member.dto.response;

import java.time.LocalDateTime;

public record TimeAttackResponse (
    int timeAttactTime,
    LocalDateTime playDate
){
    public static TimeAttackResponse of(int timeAttactTime, LocalDateTime playDate){
        return new TimeAttackResponse(timeAttactTime, playDate);
    }
}
