package com.example.movie_service.exception;

public class MovieNotFoundException extends RuntimeException {
	 
    public MovieNotFoundException(String message) {
        super(message);
    }
}