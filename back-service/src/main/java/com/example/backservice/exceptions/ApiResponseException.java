package com.example.backservice.exceptions;

public class ApiResponseException extends RuntimeException {
    public ApiResponseException(String message) {
        super(message);
    }
}
