package org.ssafy.bibibig.quiz.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.ssafy.bibibig.quiz.dto.request.MessageElement;
import org.ssafy.bibibig.quiz.dto.request.OXQuizRequest;
import org.ssafy.bibibig.quiz.dto.request.OXQuizRequestContent;
import org.ssafy.bibibig.quiz.dto.response.OXQuizQuestion;
import org.ssafy.bibibig.quiz.dto.response.OXQuizResponse;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class OpenAIUtils {

    @Value("${openai.FINETUING_MODEL}")
    private String model;
    @Value("${openai.KEY}")
    private String key;
    @Value("${openai.CHAT_URL}")
    private String url;

    public List<OXQuizQuestion> generateOXQuiz(List<String> summaries) throws JsonProcessingException {
        String systemContent = "For the provided articles article1, aritcle2, article3, and article4, create one O or X quiz per article and provide questions and answers for each quiz. Answer: (boolean)";

        OXQuizRequestContent userContent = OXQuizRequestContent.of(summaries.get(0), summaries.get(1), summaries.get(2), summaries.get(3));

        List<MessageElement<?>> messages = new ArrayList<>();
        MessageElement<String> systemMessage = MessageElement.of("system", systemContent);

        ObjectMapper objectMapper = new ObjectMapper();
        String userContentJson = objectMapper.writeValueAsString(userContent);
        MessageElement<String> userMessage = MessageElement.of("user", userContentJson);

        messages.add(systemMessage);
        messages.add(userMessage);

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(key);

        OXQuizRequest request = OXQuizRequest.of(model, messages);

        HttpEntity<OXQuizRequest> requestEntity = new HttpEntity<>(request, headers);

        ResponseEntity<OXQuizResponse> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.POST,
                requestEntity,
                OXQuizResponse.class
        );
        String content = (String) responseEntity.getBody().choices().get(0).message().content();
        return contentExtractor(content);
    }


    public List<OXQuizQuestion> contentExtractor(String content) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode contentNode = null;
        contentNode = objectMapper.readTree(removeSquareBrackets(content));
        List<OXQuizQuestion> results = new ArrayList<>();

        for (JsonNode node : contentNode) {
            String articleKey = node.fieldNames().next();
            JsonNode articleNode = node.get(articleKey);
            String question = articleNode.get("question").asText();
            Boolean answer = articleNode.get("answer").asBoolean();

            OXQuizQuestion quizQuestion = OXQuizQuestion.of(question, String.valueOf(answer));
            results.add(quizQuestion);
        }
        return results;
    }

    private String removeSquareBrackets(String json) {
        return json.replaceAll("\\{\\[", "[").replaceAll("\\]\\}", "]");
    }
}
