package org.ssafy.bibibig.quiz.utils;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.config.YamlMapFactoryBean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.client.RestTemplate;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

class WordDefineTest {
    @ParameterizedTest
    @ValueSource(strings = {"사과", "공군참모차장", "선거"})
    @DisplayName("단어 정의 호출 테스트")
    public void wordDefineTest(String input) throws NoSuchFieldException, IllegalAccessException {
        // given
        RestTemplate restTemplate = new RestTemplate();
        WordDefine wordDefineRequest = new WordDefine(restTemplate);

        setField(wordDefineRequest, "key", getKey("application-test.yml"));

        // when
        String wordDefine = wordDefineRequest.getWordDefine(input);
        System.out.println(wordDefine);
        // then
        assertTrue(wordDefine != null && !wordDefine.isEmpty());
    }

    @ParameterizedTest
    @ValueSource(strings = {"방위비", "위원장", "그"})
    @DisplayName("단어 정의를 찾을 수 없는 테스트")
    public void wordDefineNotFoundTest(String input) throws NoSuchFieldException, IllegalAccessException {
        // given
        RestTemplate restTemplate = new RestTemplate();
        WordDefine wordDefineRequest = new WordDefine(restTemplate);

        setField(wordDefineRequest, "key", getKey("application-test.yml"));

        // when, then
        assertThrows(NoSuchElementException.class, () -> wordDefineRequest.getWordDefine(input));
    }

    @ParameterizedTest
    @MethodSource("keywordsAndResult")
    @DisplayName("주어진 키워드 중 사전정의 제공 가능 여부")
    void givenKeywords_whenExistDefine_thenReturnKeyword(List<String> keywords, int resultIdx) throws NoSuchFieldException, IllegalAccessException {
        // given
        RestTemplate restTemplate = new RestTemplate();
        WordDefine wordDefineRequest = new WordDefine(restTemplate);

        setField(wordDefineRequest, "key", getKey("application-test.yml"));
        int index = 0;
        for(; index < keywords.size(); index++) {
            try {
                String description = wordDefineRequest.getWordDefine(keywords.get(index));
                System.out.println(keywords.get(index) + "의 정의: " + description);
                if(description != null) break;
            } catch(NoSuchElementException e){
            }
        }
        assertEquals(index, resultIdx);
    }


    private String getKey(String yamlFileName){
        Map<String, Object> map1 = readYamlFile(yamlFileName);
        Map<String, Map<String, String>> quiz = (Map<String, Map<String, String>>) map1.get("quiz");
        return quiz.get("word-define").get("key");
    }

    private Map<String, Object> readYamlFile(String yamlFileName) {
        YamlMapFactoryBean yamlMapFactoryBean = new YamlMapFactoryBean();
        yamlMapFactoryBean.setResources(new ClassPathResource(yamlFileName));
        yamlMapFactoryBean.afterPropertiesSet();
        return yamlMapFactoryBean.getObject();
    }

    // reflection을 사용한 필드 값 주입
    private void setField(Object target, String fieldName, Object fieldValue) throws NoSuchFieldException, IllegalAccessException {
        Field field = target.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        field.set(target, fieldValue);
    }

    static Stream<Arguments> keywordsAndResult() {
        return Stream.of(
                Arguments.arguments(List.of("방위비", "위원장", "공군참모차장"), 2),
                Arguments.arguments(List.of("방위비", "위원장", "그"), 3),
                Arguments.arguments(List.of("방위비", "사과", "위원장"), 1),
                Arguments.arguments(List.of("사과", "공군참모차장", "사과"), 0)

        );
    }
}