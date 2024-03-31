package org.ssafy.bibibig.quiz.dto.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

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

    public String getQuestion() {
        return question;
    }

    public boolean isAnswer() {
        return answer;
    }
}
