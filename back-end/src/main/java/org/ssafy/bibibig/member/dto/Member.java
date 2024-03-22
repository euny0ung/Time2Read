package org.ssafy.bibibig.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.ssafy.bibibig.member.domain.MemberEntity;

@AllArgsConstructor
@Getter
@ToString
public class Member {
    private Long id;
    private String name;
    private String email;

    public static Member of(Long id, String name, String email){
        return new Member(id, name, email);
    }

    public MemberEntity toEntity(){
        return MemberEntity.of(id, name, email,null);
    }

    public static Member from(MemberEntity entity){
        return Member.of(
                entity.getId(),
                entity.getName(),
                entity.getEmail()
        );

    }
}
