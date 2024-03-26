package org.ssafy.bibibig.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class Quiz {
    private QuizType quizType;
    private String answer;
    private List<Clue> clues;
}
