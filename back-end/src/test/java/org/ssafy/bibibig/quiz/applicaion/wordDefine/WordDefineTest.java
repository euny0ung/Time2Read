package org.ssafy.bibibig.quiz.applicaion.wordDefine;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.config.YamlMapFactoryBean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.client.RestTemplate;

import java.lang.reflect.Field;
import java.util.Map;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

class WordDefineTest {
    @Test
    @DisplayName("단어 정의 호출 테스트")
    public void wordDefineTest() throws NoSuchFieldException, IllegalAccessException {
        // given
        String word = "사과";
        RestTemplate restTemplate = new RestTemplate();
        WordDefine wordDefineRequest = new WordDefine(restTemplate);

        setField(wordDefineRequest, "key", getKey("application-test.yml"));

        // when
        String wordDefine = wordDefineRequest.getWordDefine(word);

        // then
        assertTrue(wordDefine != null && !wordDefine.isEmpty());
    }

    @Test
    @DisplayName("단어 정의를 찾을 수 없는 테스트")
    public void wordDefineNotFoundTest() throws NoSuchFieldException, IllegalAccessException {
        // given
        String word = "그";
        RestTemplate restTemplate = new RestTemplate();
        WordDefine wordDefineRequest = new WordDefine(restTemplate);

        setField(wordDefineRequest, "key", getKey("application-test.yml"));

        // when, then
        assertThrows(NoSuchElementException.class, () -> wordDefineRequest.getWordDefine(word));
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
}