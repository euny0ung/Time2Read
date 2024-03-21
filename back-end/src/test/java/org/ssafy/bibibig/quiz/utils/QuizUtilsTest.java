package org.ssafy.bibibig.quiz.utils;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.regex.Pattern;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class QuizUtilsTest {

    private String makeBlur(String content, String keyword) {
        Pattern pattern = Pattern.compile(keyword);
        int keywordLen = keyword.length();
        StringBuilder replacement = new StringBuilder();
        for(int i = 0; i < keywordLen; i++)
            replacement.append("O");

        return pattern.matcher(content).replaceAll(replacement.toString());
    }

    @ParameterizedTest
    @MethodSource("contentAndKeyword")
    @DisplayName("본문 키워드 빈칸처리하기")
    public void content_keyword_blur(String content, String keyword, String answer) {
        assertEquals(answer, makeBlur(content, keyword));
    }

    static Stream<Arguments> contentAndKeyword() {
        return Stream.of(
                Arguments.arguments("안녕", "안녕", "OO"),
                Arguments.arguments("안녕하세요.","안녕하세요", "OOOOO."),
                Arguments.arguments("대통령리더십연구소의 아무개대통령의 보좌관 최진은 대통령의 옆에서 역할을 보좌하였다. 대통령", "대통령","OOO리더십연구소의 아무개OOO의 보좌관 최진은 OOO의 옆에서 역할을 보좌하였다. OOO"),
                Arguments.arguments("세계금융위기가 닥쳐왔다", "세계금융위기", "OOOOOO가 닥쳐왔다")
        );
    }

}