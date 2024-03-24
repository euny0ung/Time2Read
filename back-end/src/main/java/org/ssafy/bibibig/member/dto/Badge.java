package org.ssafy.bibibig.member.dto;


import lombok.Getter;
import lombok.ToString;
import org.ssafy.bibibig.member.domain.BadgeEntity;
import org.ssafy.bibibig.member.domain.MemberEntity;
import java.time.LocalDateTime;

@ToString
@Getter
public class Badge {
        private Long id;
        private int year;
        private int count;
        private LocalDateTime createdAt;
        private MemberEntity member;
    private Badge(int year, int count) {
        this.year = year;
        this.count = count;
    }

    public static Badge of(int year, int count){
        return new Badge(year, count);
    }
    public static Badge from(BadgeEntity entity){
        return Badge.of(
                entity.getYear(),
                entity.getCount()
        );
    }
}
