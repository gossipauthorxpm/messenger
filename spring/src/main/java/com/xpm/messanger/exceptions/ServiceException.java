package com.xpm.messanger.exceptions;


import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;

@Getter
public class ServiceException extends RuntimeException {

    private final HttpStatus httpStatus;

    public ServiceException(String message, HttpStatus status) {
        super(message);
        this.httpStatus = status;
    }
    public ServiceException(String message) {
        super(message);
        this.httpStatus = HttpStatus.BAD_REQUEST;
    }
}
