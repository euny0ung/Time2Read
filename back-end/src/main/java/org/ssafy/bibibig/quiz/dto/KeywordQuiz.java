package org.ssafy.bibibig.quiz.dto;

import java.util.List;

public class KeywordQuiz extends Quiz{

    private String questionContent;

    public KeywordQuiz(QuizType quizType, String questionContent,
                       String questionSummary, String answer, List<Clue> clues) {
        super(quizType, questionSummary, answer, clues, new QuizAdditionalInfo(questionContent, null));
    }
}
