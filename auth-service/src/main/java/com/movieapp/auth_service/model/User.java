package com.movieapp.auth_service.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class User {
	@Id
	private String id;
	private String userName;
	private String firstName;
	private String lastName;
	private String email;
	private Long phoneNo;
	private String password;
	
	private String securityQuestion;
    private String securityAnswer;

}


