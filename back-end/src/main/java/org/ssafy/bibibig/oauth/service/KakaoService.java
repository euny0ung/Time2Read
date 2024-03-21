package org.ssafy.bibibig.oauth.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.ssafy.bibibig.oauth.dto.MemberInfo;
import org.ssafy.bibibig.oauth.dto.response.TokenResponse;
import org.ssafy.bibibig.oauth.dto.response.UserResponse;

@Service
public class KakaoService {

    @Value("${oauth.KAKAO_CLIENT_ID}") String CLIENT_ID;
    @Value("${oauth.KAKAO_AUTHORIZE_URL}") String AUTHORIZE_URL;
    @Value("${oauth.KAKAO_REDIRECT_URL}") String REDIRECT_URL;
    @Value("${oauth.KAKAO_TOKEN_REQUEST_URL}") String TOKEN_REQUEST_URL;
    @Value("${oauth.KAKAO_USER_INFO_REQUEST_URL}") String USER_INFO_REQUEST_URL;
    @Value("${oauth.KAKAO_SECURE_RESOURCE}") String SECURE_RESOURCE;

    public ResponseEntity<TokenResponse> requestToken(String code){
        RestTemplate restTemplate = new RestTemplate();

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();

        body.add("grant_type", "authorization_code");
        body.add("client_id", CLIENT_ID);
        body.add("redirect_uri", REDIRECT_URL);
        body.add("code", code);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, header());

        return restTemplate.exchange(
                TOKEN_REQUEST_URL,
                HttpMethod.POST,
                requestEntity,
                TokenResponse.class
        );
    }

    public MemberInfo requestAccount(String token){
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = header();
        headers.setBearerAuth(token);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("secure_resource", SECURE_RESOURCE);
        body.add("property_keys", "[\"kakao_account.name\", \"kakao_account.email\"]");

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);

        ResponseEntity<UserResponse> responseEntity = restTemplate.exchange(
                USER_INFO_REQUEST_URL,
                HttpMethod.GET,
                requestEntity,
                UserResponse.class
        );
        UserResponse userResponse = responseEntity.getBody();
        if(userResponse==null){
            return null;
        }

        return MemberInfo.of(null,userResponse.getKakaoAccount().getName(), userResponse.getKakaoAccount().getEmail());
    }

    private HttpHeaders header(){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        return headers;
    }
}
