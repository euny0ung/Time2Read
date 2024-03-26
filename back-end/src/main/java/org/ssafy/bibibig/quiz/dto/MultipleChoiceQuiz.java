package org.ssafy.bibibig.quiz.dto;

import java.util.List;

public class MultipleChoiceQuiz extends Quiz {

    private String questionSummary;
    private List<String> choice;

    public MultipleChoiceQuiz(QuizType quizType, String questionSummary, String answer, List<Clue> clues, List<String> choice) {
        super(quizType, answer, clues);
        this.questionSummary = questionSummary;
        this.choice = choice;
    }
}
