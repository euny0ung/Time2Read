package org.ssafy.bibibig.quiz.dto.response;

public record OXQuizQuestion(
        String question,
        String answer
) {
    public static OXQuizQuestion of(String question, String answer) {
        return new OXQuizQuestion(question, answer);
    }
}
