package org.ssafy.bibibig.oauth.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class UserResponse {

        private Long id;

        @JsonProperty("connected_at")
        private String connectedAt;

        @JsonProperty("synched_at")
        private String synchedAt;

        @JsonProperty("kakao_account")
        private KakaoAccount kakaoAccount;

        @Setter
        @Getter
        @ToString
        static public class KakaoAccount{
                @JsonProperty("name_needs_agreement")
                private boolean nameNeedsAgreement;
                private String name;
                @JsonProperty("has_email")
                private boolean hasEmail;
                @JsonProperty("email_needs_agreement")
                private  boolean emailNeedsAgreement;
                @JsonProperty("is_email_valid")
                private boolean isEmailValid;
                @JsonProperty("is_email_verified")
                private boolean isEmailVerified;
                private String email;

        }

}
