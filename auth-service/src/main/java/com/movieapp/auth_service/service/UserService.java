package com.movieapp.auth_service.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.movieapp.auth_service.model.AuthRequest;
import com.movieapp.auth_service.model.User;

@Service
public interface UserService {
//	 AuthRequest getUserByEmail(String email);
	User addUser(User user);
	User getUserFromEmail(String email);
	User updateUser(User user);

}
