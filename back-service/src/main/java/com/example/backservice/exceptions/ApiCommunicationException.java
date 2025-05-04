package com.example.backservice.exceptions;

public class ApiCommunicationException extends RuntimeException {
    public ApiCommunicationException(String message) {
        super(message);
    }

    public ApiCommunicationException(String message, Throwable cause) {
        super(message, cause);
    }
}