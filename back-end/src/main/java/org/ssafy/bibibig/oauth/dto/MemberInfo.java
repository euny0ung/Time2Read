package org.ssafy.bibibig.oauth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.ssafy.bibibig.oauth.domain.Member;

@AllArgsConstructor
@Getter
@ToString
public class MemberInfo {
    private Long id;
    private String name;
    private String email;

    public static MemberInfo of(String name, String email){
        return new MemberInfo(null, name, email);
    }

    public Member toEntity(){
        return Member.of(null, name, email,null);
    }
}
