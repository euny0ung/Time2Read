package org.ssafy.bibibig.common.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    DUPLICATED_USER_EMAIL(HttpStatus.CONFLICT, "User email is duplicated"),
    DUPLICATED_USER_NICKNAME(HttpStatus.CONFLICT, "User nickname is duplicated"),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "User not founded"),
    UNSUITABLE_NICKNAME(HttpStatus.BAD_REQUEST, "Nickname does not meet the condition"),
    UNSUITABLE_EMAIL(HttpStatus.BAD_REQUEST, "Email does not meet the condition"),
    SELF_FOLLOW_ERROR(HttpStatus.BAD_REQUEST, "Self following is invalid"),
    ARTICLE_NOT_FOUND(HttpStatus.NOT_FOUND, "Article not founded"),
    ARTICLE_IMAGE_EMPTY(HttpStatus.BAD_REQUEST, "Article image is empty"),
    ARTICLE_DELETED(HttpStatus.NOT_FOUND, "Article is deleted"),
    CONSTELLATION_NOT_FOUND(HttpStatus.NOT_FOUND, "Constellation not founded"),
    CONSTELLATION_USER_NOT_FOUND(HttpStatus.NOT_FOUND, "ConstellationUser not founded"),
    INVALID_PASSWORD(HttpStatus.UNAUTHORIZED, "Password is invalid"),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "Token is invalid"),
    INVALID_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "Refresh Token is invalid"),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "Token is expired"),
    INVALID_PERMISSION(HttpStatus.UNAUTHORIZED, "Permission is invalid"),
    COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "Comment not founded"),
    INVALID_CONTENT(HttpStatus.BAD_REQUEST, "Content type is invalid"),
    FOLLOW_NOT_FOUND(HttpStatus.NOT_FOUND, "Follow status not founded in follow list"),
    INVALID_REQUEST(HttpStatus.BAD_REQUEST, "Request is invalid"),
    UNABLE_TO_SEND_EMAIL(HttpStatus.INTERNAL_SERVER_ERROR, "Email failed to send"),
    NEVER_ATTEMPT_EMAIL_AUTH(HttpStatus.BAD_REQUEST, "이메일 인증을 요청한 적이 없음"),
    INVALID_EMAIL_CODE(HttpStatus.BAD_REQUEST, "인증코드가 일치하지 않음"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server error"),
    IMAGE_NOT_FOUND(HttpStatus.NOT_FOUND, "Image Not Founded"),
    CONTOUR_NOT_FOUND(HttpStatus.NOT_FOUND, "Contour Not Founded"),
    ALREADY_DEFAULT_IMAGE(HttpStatus.CONFLICT, "Profile already Default");

    final private HttpStatus status;
    final private String message;
}
