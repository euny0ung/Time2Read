package org.ssafy.bibibig.member.dto.response;

public record BadgeResponse (
    int year,
    int count

    ){

    public static BadgeResponse of(int year, int count) {
        return new BadgeResponse(year, count);
    }

}
