package org.ssafy.bibibig.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.ssafy.bibibig.member.domain.MemberEntity;
import org.ssafy.bibibig.member.domain.SolvedCategoriesEntity;
import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@ToString
public class Member {
    private Long id;
    private String name;
    private String email;
    private LocalDateTime createdAt;
    private SolvedCategoriesEntity solvedCategoriesEntity;

    public Member(Long id, String name, String email){
        this.id = id;
        this.name=name;
        this.email=email;
    }
    public static Member of(Long id, String name, String email){
        return new Member(id, name, email);
    }
    public static Member of(Long id, String name, String email,LocalDateTime createdAt, SolvedCategoriesEntity solvedCategoriesEntity){
        return new Member(id, name, email,createdAt, solvedCategoriesEntity);
    }

    public MemberEntity toEntity(SolvedCategoriesEntity solvedCategoriesEntity){
        return MemberEntity.of(id, name, email, createdAt, solvedCategoriesEntity);
    }

    public static Member from(MemberEntity entity){
        return Member.of(
                entity.getId(),
                entity.getName(),
                entity.getEmail(),
                entity.getCreatedAt(),
                null
        );

    }
}
