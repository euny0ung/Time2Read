package org.ssafy.bibibig.common.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@AllArgsConstructor
public class Response<T> {
    private ResponseStatus status;
    private T result;

    public static ResponseEntity<Response<Void>> success(){
        ResponseStatus status = new ResponseStatus("SUCCESS", HttpStatus.OK,"");
        Response<Void> response = new Response<>(status, null);
        return ResponseEntity.ok(response);
    }
    public static <T> ResponseEntity<Response<T>> success(T result) {
        ResponseStatus status = new ResponseStatus("SUCCESS", HttpStatus.OK,"");
        Response<T> response = new Response<>(status, result);
        return ResponseEntity.ok(response);
    }

    public static ResponseEntity<Response<Void>> error(ErrorCode errorCode){
        ResponseStatus status = new ResponseStatus("ERROR", errorCode.getStatus(), errorCode.getMessage());
        Response<Void> response = new Response<>(status,null );
        return new ResponseEntity<>(response, errorCode.getStatus());
    }
}
