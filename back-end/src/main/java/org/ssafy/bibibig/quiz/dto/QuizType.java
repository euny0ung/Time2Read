package org.ssafy.bibibig.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum QuizType {
    KEYWORD("빈칸 뚫기"),
    OX("O X 문제"),
    MULTIPLE_CHOICE("객관식");

    private final String description;
}
