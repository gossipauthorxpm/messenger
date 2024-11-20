package com.xpm.messanger.exceptions;

import com.xpm.messanger.http.HttpResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
@ResponseBody
public class GlobalExceptionHandler {


    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public HttpResponse handleInvalidArgument(MethodArgumentNotValidException exception) {
        Map<String, String> errorMap = new HashMap<>();
        exception.getBindingResult().getFieldErrors().forEach(error ->
            errorMap.put(error.getField(), error.getDefaultMessage())
        );
        return new HttpResponse(HttpStatus.BAD_REQUEST,
                "Incorrectly entered values!",
                errorMap);
    }


    @ResponseStatus(value = HttpStatus.CONFLICT)
    @ExceptionHandler(ServiceException.class)
    public HttpResponse handleException(ServiceException exception) {
        return new HttpResponse(exception.getHttpStatus(), exception.getMessage(), exception.toString());
    }

    /**
     * Обработка всех типов ошибок
     */

    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler({Exception.class})
    public HttpResponse handleException(Exception ex) {
        return new HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex.toString());
    }

}
