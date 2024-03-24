package org.ssafy.bibibig.common.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class ResponseStatus {
    private String code;
    private HttpStatus httpStatus;
    private String message;
}
