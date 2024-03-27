package org.ssafy.bibibig.quiz.dto.request;

import java.util.List;

public record OpenAiRequest (
    String model,
    List<MessageElement> memssages
){
    public static OpenAiRequest of(String model, List<MessageElement> messages){
        return new OpenAiRequest(model, messages);
    }
}
