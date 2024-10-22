package com.example.movie_service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Component
public class globalExceptionHandler {

		@ExceptionHandler(MovieNotFoundException.class)
	    public ResponseEntity<String> handleMovieNotFoundException(MovieNotFoundException ex) {
			String customMessage = "Movie does not exist.";
			return new ResponseEntity<>(customMessage, HttpStatus.NOT_FOUND);
	    }
		
		@ExceptionHandler(MovieAlreadyExistsException.class)
	    public ResponseEntity<String> handleMovieAlreadyExistsException(MovieAlreadyExistsException ex) {
			String customMessage = "Movie already exists.";
			return new ResponseEntity<>(customMessage, HttpStatus.CONFLICT);
	    }
	
	
}