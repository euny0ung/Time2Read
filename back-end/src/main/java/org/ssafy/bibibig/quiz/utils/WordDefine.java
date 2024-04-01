package org.ssafy.bibibig.quiz.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.ssafy.bibibig.quiz.dto.response.WordDefineResponse;

import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class WordDefine {

    private static final String URL = "http://aiopen.etri.re.kr:8000/WiseQAnal";

    private final RestTemplate restTemplate;

    @Value("${quiz.word-define.key}")
    private String key;

    public String getWordDefine(String word) {
        ResponseEntity<WordDefineResponse> response = restTemplate.exchange(
                URL,
                HttpMethod.POST,
                getRequest(word),
                WordDefineResponse.class);

        return response.getBody().getTopDefine();
    }

    private HttpHeaders getHeader() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", key);
        return headers;
    }

    private HttpEntity<Map<String, Object>> getRequest(String word) {
        HttpHeaders headers = getHeader();

        Map<String, String> argument = new HashMap<>();
        Map<String, Object> body = new HashMap<>();

        argument.put("text", word);
        body.put("argument", argument);

        return new HttpEntity<>(body, headers);
    }
}
