package com.movieapp.user_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.PutExchange;

import com.movieapp.user_service.exception.UserNotFoundException;
import com.movieapp.user_service.model.PasswordResetRequest;
import com.movieapp.user_service.model.User;
import com.movieapp.user_service.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController

@RequestMapping("users")
public class UserController {
	
	@Autowired 
	UserService userService;
	
	@GetMapping
	public ResponseEntity<List<User>> getUsers() {
		return new ResponseEntity<List<User>>(userService.getUsers(),HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable String id) {
	    User user = userService.getUserById(id);
	    return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	
	@PutMapping("/{id}")
	public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User user) {
	    User updatedUser = userService.updateUser(id, user);
	    
//	    if (updatedUser == null) {
//	        throw new UserNotFoundException("User with ID " + id + " not found.");
//	    }
//	    
	    return new ResponseEntity<>(updatedUser, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable String id) {
	    String result = userService.deleteUser(id);
	    return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@PostMapping("/reset-password")
	public ResponseEntity<String> resetPassword(@RequestBody PasswordResetRequest request) {
	    try {
	        User user = userService.getByEmail(request.getEmail());

	        if (user == null )  {
	            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
	        }
	       

	        // Validate security answers
	        if (!user.getSecurityAnswer().equals(request.getAnswer())) {
	            return new ResponseEntity<>("Security answers are incorrect", HttpStatus.FORBIDDEN);
	        }

	        // Hash the new password
	        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	        String hashedPassword = passwordEncoder.encode(request.getNewPassword());
	        user.setPassword(hashedPassword);
	        
	        userService.addUser(user); // Make sure you have this method in your service

	        return new ResponseEntity<>("Password successfully reset", HttpStatus.OK);
	    } catch (Exception e) {
//	        logger.error("Error during password reset: {}", e.getMessage());
	        return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	
	
	
	

}
