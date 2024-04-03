package org.ssafy.bibibig.quiz.dto.request;

public record OXQuizRequestContent(
        String article1,
        String article2,
        String article3,
        String article4
) {
    public static OXQuizRequestContent of(
            String article1,
            String article2,
            String article3,
            String article4
    ) {
        return new OXQuizRequestContent(article1, article2, article3, article4);
    }
}
