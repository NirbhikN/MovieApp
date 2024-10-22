package com.movieapp.auth_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.movieapp.auth_service.exception.EmailNotFoundException;
import com.movieapp.auth_service.model.User;
import com.movieapp.auth_service.repository.UserRepository;

import java.util.ArrayList;
import java.util.Collection;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	 @Autowired
	    private UserRepository repository;
	    
		public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
			
			User user=repository.findByEmail(email);	
			if (user == null) {
				throw new EmailNotFoundException("Email not found");
			}
	        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), (Collection<? extends GrantedAuthority>) new ArrayList());
		//return new org.springframework.security.core.userdetails.User("user", new BCryptPasswordEncoder().encode("password"), new ArrayList<>());
		}

}
