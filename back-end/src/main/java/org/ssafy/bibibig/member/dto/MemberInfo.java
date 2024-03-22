package org.ssafy.bibibig.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.ssafy.bibibig.member.domain.MemberEntity;

@AllArgsConstructor
@Getter
@ToString
public class MemberInfo {
    private Long id;
    private String name;
    private String email;

    public static MemberInfo of(Long id, String name, String email){
        return new MemberInfo(id, name, email);
    }

    public MemberEntity toEntity(){
        return MemberEntity.of(id, name, email,null);
    }

    public static MemberInfo from(MemberEntity entity){
        return MemberInfo.of(
                entity.getId(),
                entity.getName(),
                entity.getEmail()
        );

    }
}
