package org.ssafy.bibibig.quiz.dto.response;

import org.ssafy.bibibig.quiz.dto.request.MessageElement;

public record OXQuizChoices (
    int index,
    MessageElement message
){

}
