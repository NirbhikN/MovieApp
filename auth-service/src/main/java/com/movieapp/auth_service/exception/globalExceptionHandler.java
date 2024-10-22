package com.movieapp.auth_service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Component
public class globalExceptionHandler {

		@ExceptionHandler(EmailAlreadyExistsException.class)
	    public ResponseEntity<String> handleEmailAlreadyExistsException(EmailAlreadyExistsException ex) {
			String customMessage = "Email already exists.";
			return new ResponseEntity<>(customMessage, HttpStatus.CONFLICT);
	    }
		
		@ExceptionHandler(EmailNotFoundException.class)
		public ResponseEntity<String> handleEmailNotFoundException(EmailNotFoundException ex) {
			String customMessage = "Email does not exist. Please provide a valid email.";
			return new ResponseEntity<>(customMessage, HttpStatus.NOT_FOUND);
	    }
	
	
}