package org.ssafy.bibibig.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private String email;
    private Long memberId;
    public static LoginResponse of(String email, Long memberId) {
        return new LoginResponse(email, memberId);
    }
}
