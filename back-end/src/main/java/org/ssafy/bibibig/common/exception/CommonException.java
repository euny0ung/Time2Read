package org.ssafy.bibibig.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.ssafy.bibibig.common.dto.ErrorCode;

@Getter
@AllArgsConstructor
public class CommonException extends RuntimeException {
    private ErrorCode errorCode;
    private String message;

    public CommonException(ErrorCode errorCode) {
        this.errorCode = errorCode;
        this.message = null;
    }

    @Override
    public String getMessage() {
        if (message == null) {
            return errorCode.getMessage();
        }
        return String.format("%s, %s", errorCode.getMessage(), message);
    }

}
