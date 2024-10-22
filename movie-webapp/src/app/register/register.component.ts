import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userName: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = ''; 
  password: string = '';
  confirmPassword: string = '';
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  // New fields for security question
  securityQuestion: string = '';
  securityAnswer: string = '';

  // Password complexity validation messages
  passwordErrors: string[] = [];

  constructor(private userService: UserService, private router: Router) {}

  // Method to handle Sign Up form submission
  onRegister() {
    this.passwordErrors = []; // Reset any previous errors

    // Validate password
    this.validatePassword();

    if (this.passwordErrors.length > 0) {
      alert(this.passwordErrors.join('\n'));
      return; // Stop the registration if validation fails
    }

    // Prepare the user data
    const userData: User = {
      userName: this.userName,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNo: this.phone,
      password: this.password,
      securityQuestion: this.securityQuestion,
      securityAnswer: this.securityAnswer
    };

    // Use the UserService to add the user
    this.userService.addUser(userData).subscribe(
      response => {
        console.log('Registration successful', response);
        alert('Signup successful! Welcome, ' + this.firstName);
        this.router.navigate(['/login']);
        this.resetForm();
      },
      error => {
        console.error('Error during registration', error);
        alert('Registration failed. Please try again.');
      }
    );
  }

  validatePassword() {
    if (!this.password) {
      this.passwordErrors.push('Password is required.');
    } else {
      if (this.password.length < 8) {
        this.passwordErrors.push('Password must be at least 8 characters long.');
      }
      if (!/[a-z]/.test(this.password) || !/[A-Z]/.test(this.password) || !/\d/.test(this.password) || !/[@$!%*?&#]/.test(this.password)) {
        this.passwordErrors.push('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      }
      if (this.password !== this.confirmPassword) {
        this.passwordErrors.push('Passwords do not match.');
      }
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  resetForm() {
    this.userName = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phone = '';
    this.password = '';
    this.confirmPassword = '';
    this.securityQuestion = '';
    this.securityAnswer = '';
  }

  ngOnInit() {
    this.resetForm();
  }
}
