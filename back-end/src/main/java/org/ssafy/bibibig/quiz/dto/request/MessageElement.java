package org.ssafy.bibibig.quiz.dto.request;

public record MessageElement<T>(
        String role,
        T content
) {
    public static <T> MessageElement<T> of(String role, T content) {
        return new MessageElement<>(role, content);
    }
}