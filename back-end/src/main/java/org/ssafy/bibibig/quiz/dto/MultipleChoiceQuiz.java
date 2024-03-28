package org.ssafy.bibibig.quiz.dto;

import java.util.List;

public class MultipleChoiceQuiz extends Quiz {
    private List<String> choice;

    public MultipleChoiceQuiz(QuizType quizType, String questionSummary, String answer, List<Clue> clues, List<String> choice) {
        super(quizType, questionSummary, answer, clues, new QuizAdditionalInfo(null, choice));
        this.choice = choice;
    }
}
