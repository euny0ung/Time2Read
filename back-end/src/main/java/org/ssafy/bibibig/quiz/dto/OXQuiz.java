package org.ssafy.bibibig.quiz.dto;

import java.util.List;

public class OXQuiz extends Quiz {
    public OXQuiz(QuizType quizType, String questionSummary, String answer, List<Clue> clues) {
        super(quizType, questionSummary, answer, clues, null);
    }
}
