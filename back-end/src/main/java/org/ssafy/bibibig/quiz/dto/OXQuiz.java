package org.ssafy.bibibig.quiz.dto;

import java.util.List;

public class OXQuiz extends Quiz{


    public OXQuiz(QuizType quizType, String answer, List<Clue> clues) {
        super(quizType, answer, clues);
    }
}
