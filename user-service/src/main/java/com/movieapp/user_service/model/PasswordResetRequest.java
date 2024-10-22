package com.movieapp.user_service.model;

import lombok.Data;

@Data
public class PasswordResetRequest {
    private String email;
    private String answer;
    private String newPassword;

  
}
