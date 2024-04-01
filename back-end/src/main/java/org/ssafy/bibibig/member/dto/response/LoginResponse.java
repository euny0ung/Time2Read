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
    private String name;

    public static LoginResponse of(String name) {
        return new LoginResponse(name);
    }
}
