package org.ssafy.bibibig.quiz.dto;

import java.util.List;

public class KeywordQuiz extends Quiz{

    private String questionContent;
    private String questionSummary;

    public KeywordQuiz(QuizType quizType, String questionContent,
                       String questionSummary, String answer, List<Clue> clues) {
        super(quizType, answer, clues);
        this.questionContent = questionContent;
        this.questionSummary = questionSummary;
    }
}
