package org.ssafy.bibibig.quiz.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.ssafy.bibibig.member.dao.MemberRepository;
import org.ssafy.bibibig.member.dto.response.TokenResponse;
import org.ssafy.bibibig.quiz.dto.request.MessageElement;
import org.ssafy.bibibig.quiz.dto.request.OpenAiRequest;
import org.ssafy.bibibig.quiz.dto.response.OXQuizResponse;

import java.util.ArrayList;
import java.util.List;

@Component
public class OpenAIUtils {

    @Value("${openai.finetuning.model}")
    private String model;
    @Value("${openai.key}")
    private String key;
    @Value("openai.chat.url")
    private String url;

    private HttpHeaders headers;
    private String systemContent = "Please create an O or X quiz based on the provided article and provide the quiz questions and answers, with the format as question :, answer : (Boolean)";

    public OXQuizResponse gernerateOXQuiz(String summary){

        List<MessageElement> messages = new ArrayList<>();
        MessageElement systemMessage = MessageElement.of("system","systemContent");
        MessageElement userMessage = MessageElement.of("user","summary");
        messages.add(systemMessage);
        messages.add(userMessage);

        RestTemplate restTemplate = new RestTemplate();
        headers.setBearerAuth(key);
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();

        OpenAiRequest request = OpenAiRequest.of(model, messages);

        HttpEntity<OpenAiRequest> requestEntity = new HttpEntity<>(request, headers);

        ResponseEntity<OXQuizResponse> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.POST,
                requestEntity,
                OXQuizResponse.class
        );
        return responseEntity.getBody();
    }
}
