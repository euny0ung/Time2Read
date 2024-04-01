package org.ssafy.bibibig.quiz.dto.request;

import java.util.List;

public record OXQuizRequest(
        String model,
        List<MessageElement<?>> messages
) {
    public static OXQuizRequest of(String model, List<MessageElement<?>> messages) {
        return new OXQuizRequest(model, messages);
    }
}
