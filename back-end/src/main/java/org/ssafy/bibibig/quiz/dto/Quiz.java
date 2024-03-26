package org.ssafy.bibibig.quiz.dto;

import java.util.List;

public record Quiz(
        QuizType quizType,
        String questionContent,
        String questionSummary,
        String answer,
        List<Clue> clues
) {
}
