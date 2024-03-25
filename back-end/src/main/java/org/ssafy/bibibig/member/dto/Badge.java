package org.ssafy.bibibig.member.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.ssafy.bibibig.member.domain.BadgeEntity;
import org.ssafy.bibibig.member.domain.MemberEntity;
import org.ssafy.bibibig.member.domain.SolvedCategoriesEntity;

import java.time.LocalDateTime;

@ToString
@Getter
@AllArgsConstructor
public class Badge {
        private Long id;
        private int year;
        private int count;
        private LocalDateTime createdAt;
        private Member member;
    private Badge(int year, int count) {
        this.year = year;
        this.count = count;
    }

    public static Badge of(Long id, int year, int count, LocalDateTime createdAt, Member member){
        return new Badge(id, year, count, createdAt, member);
    }

    public static Badge from(BadgeEntity entity){
        return Badge.of(
                entity.getId(),
                entity.getYear(),
                entity.getCount(),
                entity.getCreatedAt(),
                Member.from(entity.getMember())
        );
    }
    public static BadgeEntity toEnitiy(Long id, int year, int count, LocalDateTime createdAt, Member member){
        return BadgeEntity.of(
                id,
                year,
                count,
                createdAt,
                MemberEntity.of(member.getId(), member.getName(), member.getEmail(), member.getCreatedAt(), null)
        );
    }
    public BadgeEntity toEntityCountUp(){
        return BadgeEntity.of(
                id,
                year,
                count + 1 ,
                createdAt,
                MemberEntity.of(member.getId(), member.getName(), member.getEmail(), member.getCreatedAt(), null)
        );
    }
}
