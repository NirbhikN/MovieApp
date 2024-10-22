package com.example.movie_service.exception;

public class MovieAlreadyExistsException extends RuntimeException {
	 
    public MovieAlreadyExistsException(String message) {
        super(message);
    }
}