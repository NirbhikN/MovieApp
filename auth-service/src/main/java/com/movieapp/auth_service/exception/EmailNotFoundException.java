package com.movieapp.auth_service.exception;

public class EmailNotFoundException extends RuntimeException {
	 
    public EmailNotFoundException(String message) {
        super(message);
    }

}
