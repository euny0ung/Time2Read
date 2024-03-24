package org.ssafy.bibibig.quiz.dto;

public record Quiz(
    QuizType quizType,
    String questionContent,
    String questionSummary,
    String answer,
    Clue clue
) {
}
