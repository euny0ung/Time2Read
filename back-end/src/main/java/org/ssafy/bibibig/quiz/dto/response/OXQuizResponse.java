package org.ssafy.bibibig.quiz.dto.response;

import java.util.List;

public record OXQuizResponse (

        String id,
        String object,
        int created,
        String model,
        List<OXQuizChoices> choices
    ){

            }
