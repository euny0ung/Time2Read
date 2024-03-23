package org.ssafy.bibibig.member.dto.response;

import java.time.LocalDateTime;

public record TimeAttackResponse (
    String timeAttactTime,
    LocalDateTime playDate
){
    public static TimeAttackResponse of(String timeAttactTime, LocalDateTime playDate){
        return new TimeAttackResponse(timeAttactTime, playDate);
    }
}
