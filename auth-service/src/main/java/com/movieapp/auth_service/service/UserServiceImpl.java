package com.movieapp.auth_service.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movieapp.auth_service.exception.EmailAlreadyExistsException;
import com.movieapp.auth_service.exception.EmailNotFoundException;
import com.movieapp.auth_service.model.AuthRequest;
import com.movieapp.auth_service.model.User;
import com.movieapp.auth_service.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserRepository userRepository;

	@Override
	public User addUser(User user) throws EmailAlreadyExistsException{
		// TODO Auto-generated method stub
		
		// Check if a user with the same email already exists
	    if (userRepository.findByEmail(user.getEmail()) != null) {
	    	
	        // Throw the EmailAlreadyExistsException if email is already in use
	        throw new EmailAlreadyExistsException("Email " + user.getEmail() + " is already registered.");
	    }
	    
	    // Save the new user if email doesn't exist
	    return userRepository.save(user);
	}

	@Override
	public User getUserFromEmail(String email) {
	    User user = userRepository.findByEmail(email);
	    
	    if (user == null) {
	        throw new EmailNotFoundException("User with email " + email + " not found.");
	    }
	    
	    return user;
	}

	@Override
	public User updateUser(User user) {
	    // Check if a user with the given email exists
	    User existingUser = userRepository.findByEmail(user.getEmail());
	    
	    if (existingUser == null) {
	        // Throw EmailNotFoundException if the email is not found
	        throw new EmailNotFoundException("User with email " + user.getEmail() + " not found.");
	    }
	    
	    // Proceed with updating the user if found
	    return userRepository.save(user);
	}

	
	
	

}
