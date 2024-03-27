package org.ssafy.bibibig.quiz.dto.request;

public record MessageElement(
    String role,
    String content
){
    public static MessageElement of(String role, String content){
        return new MessageElement(role, content);
    }
}
