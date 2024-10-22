package com.movieapp.user_service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Component
public class globalExceptionHandler {

		@ExceptionHandler(UserNotFoundException.class)
	    public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException ex) {
			String customMessage = "User does not exist. Input a valid user.";
			return new ResponseEntity<>(customMessage, HttpStatus.NOT_FOUND);
	    }
	
	
}