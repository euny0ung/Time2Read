package org.ssafy.bibibig.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.ssafy.bibibig.common.dto.Response;

@RestControllerAdvice
public class CommonExceptionHandler {

    @ExceptionHandler(CommonException.class)
    public ResponseEntity<?> applicationExceptionHandler(CommonException exception){
        System.out.println("Error occur : ["+exception.toString()+"]");
        return Response.error(exception.getErrorCode());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> applicationExceptionHandler(RuntimeException exception){
        System.out.println("Error occur : ["+exception.toString()+"]");
        return Response.error(HttpStatus.INTERNAL_SERVER_ERROR, exception.getMessage());
    }


}
