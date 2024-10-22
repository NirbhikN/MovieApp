package com.movieapp.auth_service.controller;

import java.util.HashMap;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


import com.movieapp.auth_service.model.AuthRequest;
import com.movieapp.auth_service.model.User;
import com.movieapp.auth_service.service.UserService;
import com.movieapp.auth_service.util.old.JwtUtil;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("auth")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserService userService;

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/check")
    public ResponseEntity<String> check(){
        return new ResponseEntity<>("working", HttpStatus.OK);
    }

    @PostMapping("/login")
    public String generateToken(@RequestBody AuthRequest authRequest) throws Exception {
        //try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );
//        } catch (Exception ex) {
//            logger.error("Error during authentication: {}", ex.getMessage());
//            throw new Exception("Invalid username/password");
//        }
        return jwtUtil.generateToken(authRequest.getEmail());
    }

    @PostMapping("/register")
    public ResponseEntity<User> addUser(@RequestBody User user) {
//        try {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String hashedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(hashedPassword);
            
            User savedUser = userService.addUser(user);
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
//        } catch (Exception e) {
//            logger.error("Error during user registration: {}", e.getMessage());
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
    }
    
    @PostMapping("/test")
    public ResponseEntity<String> test(@RequestBody User user){
        return new ResponseEntity<>(user.toString(), HttpStatus.OK);
    }
    
    @GetMapping("/get-user")
    public ResponseEntity<?> getUserFromToken(@RequestHeader("Authorization") String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        String email = jwtUtil.extractUsername(token);
        if (email != null) {
            return ResponseEntity.ok(userService.getUserFromEmail(email));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }
    
    @PutMapping("/update-user")
    public ResponseEntity<User> updateUser(@RequestBody User updatedUser) {
        try {
            // Fetch the existing user from the database using email
            User existingUser = userService.getUserFromEmail(updatedUser.getEmail());
            if (existingUser == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            
            // Update user fields
            existingUser.setUserName(updatedUser.getUserName());
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setPhoneNo(updatedUser.getPhoneNo());
            
            // Save the updated user
            User savedUser = userService.updateUser(existingUser);
            return new ResponseEntity<>(savedUser, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error during user update: {}", e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}
