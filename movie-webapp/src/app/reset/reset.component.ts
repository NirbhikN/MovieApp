import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { Router } from '@angular/router'; // Import Router for navigation
import { UserService } from '../service/user.service'; // Import the UserService
import { User } from '../model/user.model'; // Import the Forget model
 
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent {
  forgotPasswordForm: FormGroup;
  user: User = new User();  // Create an instance of the Forget model
 
  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private snackBar: MatSnackBar,  // Inject MatSnackBar
    private router: Router  // Inject Router
  ) {
    // Define form controls and validations
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Email input with validation
      securityQuestion: ['', Validators.required],  // Security question selection
      securityAnswer: ['', Validators.required],  // Security question answer
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),  // Minimum password length of 8 characters
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/)  // Password complexity pattern
      ]]
    });
  }
 
  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      // Assign form values to the user model
      this.user.email = this.forgotPasswordForm.get('email')?.value;
      this.user.securityQuestion = this.forgotPasswordForm.get('securityQuestion')?.value;
      this.user.securityAnswer = this.forgotPasswordForm.get('securityAnswer')?.value;
      this.user.password = this.forgotPasswordForm.get('newPassword')?.value;  // Assign the new password
      //Call the resetPassword method in the UserService
      this.userService.resetPassword(this.user.email, this.user.securityAnswer, this.user.password).subscribe(
        (response) => {
          console.log('Password reset successfully', response);
          this.openSnackBar('Password reset successfully', 'Close');
          this.router.navigate(['/home']);  // Navigate to /home after successful reset
        },
        (error) => {
          console.error('Error during password reset', error);
          if (error.status === 400 || error.status === 401) {  // Assuming 400 or 401 indicates invalid details
            this.openSnackBar('Invalid details. Please try again.', 'Close');
          } else {
            this.openSnackBar('Error during password reset', 'Close');  // Generic error message
          }
        }
      );
      this.router.navigate(['/login']);
      console.log(this.user.email,this.user.securityAnswer,this.user.password)
    } else {
      this.forgotPasswordForm.markAllAsTouched();  // Show validation errors if form is invalid
    }
  }
 
  // Snackbar method
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000, 
      horizontalPosition: 'center',  
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'],    
    });
  }
}