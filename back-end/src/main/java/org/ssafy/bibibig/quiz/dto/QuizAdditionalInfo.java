package org.ssafy.bibibig.quiz.dto;

import java.util.List;

public record QuizAdditionalInfo(
        String questionContent,
        List<String> choices
) {

}
