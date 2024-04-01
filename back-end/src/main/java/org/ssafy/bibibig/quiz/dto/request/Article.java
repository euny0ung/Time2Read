package org.ssafy.bibibig.quiz.dto.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class Article {
    private final String question;
    private final boolean answer;

    @JsonCreator
    public Article(
            @JsonProperty("question") String question,
            @JsonProperty("answer") boolean answer) {
        this.question = question;
        this.answer = answer;
    }

}
