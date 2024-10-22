package com.movieapp.user_service.model;

import java.util.List;

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
	//added below two
	private String securityQuestion;
    private String securityAnswer;

	
}
