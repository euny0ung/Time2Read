package org.ssafy.bibibig.quiz.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.ssafy.bibibig.quiz.dto.request.MessageElement;
import org.ssafy.bibibig.quiz.dto.request.OXQuizRequest;
import org.ssafy.bibibig.quiz.dto.request.OXQuizRequestContent;
import org.ssafy.bibibig.quiz.dto.response.OXQuizQuestion;

import javax.swing.plaf.synth.SynthTextAreaUI;
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

        OXQuizRequestContent userContent = OXQuizRequestContent.of(summaries.get(0),summaries.get(1),summaries.get(2),summaries.get(3));

        List<MessageElement<?>> messages = new ArrayList<>();
        MessageElement<String> systemMessage = MessageElement.of("system",systemContent);

        ObjectMapper objectMapper = new ObjectMapper();
        String userContentJson = objectMapper.writeValueAsString(userContent);
        MessageElement<String> userMessage = MessageElement.of("user", userContentJson);

        System.out.println("userMessage : "+userMessage);

        messages.add(systemMessage);
        messages.add(userMessage);

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(key);

        OXQuizRequest request = OXQuizRequest.of(model, messages);

        System.out.println("request: "+ request);

        HttpEntity<OXQuizRequest> requestEntity = new HttpEntity<>(request, headers);

//        ResponseEntity<OXQuizResponse> responseEntity = restTemplate.exchange(
//                url,
//                HttpMethod.POST,
//                requestEntity,
//                OXQuizResponse.class
//        );
//        System.out.println("11111111111: "+ (String)responseEntity.getBody().choices().get(0).message().content());
//        List<OXQuizQuestion> re = contentExtractor((String)responseEntity.getBody().choices().get(0).message().content());
        contentExtractor("{[{\"article1\": {\"question\": \"발인 26일 오전 9시에 발인이 있었습니까?\", \"answer\": false}}, {\"article2\": {\"question\": \"박성식 다빈치 대표는 노벨라 선집을 활판인쇄로 만든 경우 최초일지 모른다고 말했습니까?\", \"answer\": true}}, {\"article3\": {\"question\": \"이이남 작가는 국내에서 100차례 가까이의 개인전에 참여했습니까?\", \"answer\": false}}, {\"article4\": {\"question\": \"17일에는 전국 대부분 지역에 비가 내릴 것으로 예상됩니까?\", \"answer\": true}}]}");
        return null;
    }


    public List<OXQuizQuestion> contentExtractor(String content) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode contentNode = objectMapper.readTree(removeSquareBrackets(content));

        List<OXQuizQuestion> results = new ArrayList<>();

        for (int i = 1; i <= 4; i++) {
            String articleKey = "article" + i;
            JsonNode articleNode = contentNode.get(articleKey);
            if (articleNode != null) {
                String question = articleNode.get("question").asText();
                String answer = String.valueOf(articleNode.get("answer").asBoolean());

                OXQuizQuestion quizQuestion = OXQuizQuestion.of(question, answer);
                results.add(quizQuestion);
            } else {
                // articleNode가 null인 경우, 해당 article이 없음을 로그로 출력하거나 예외를 처리할 수 있음
                log.warn("Article {} not found", articleKey);
            }
        }
        System.out.println(results);
        return results;
    }
    private String removeSquareBrackets(String json) {
        // 대괄호 []를 공백으로 대체하여 제거
        return json.replaceAll("\\[\\{", "").replaceAll("\\}\\]", "");
    }
}
