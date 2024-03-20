package org.ssafy.bibibig.oauth.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TokenResponse {
    @JsonProperty("token_type")
    private String tokenType;
    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty("expires_in")
    private int expires_in;
    @JsonProperty("refresh_token")
    private String refresh_token;
    @JsonProperty("refresh_token_expires_in")
    private int refresh_token_expires_in;
    private String scope;
}