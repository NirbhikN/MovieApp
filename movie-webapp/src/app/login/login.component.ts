import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  activeTab: string = 'sign-in'; // Default active tab
  showForgotPassword: boolean = false; // Control visibility of the forgot password section

  email: string = ''; // Changed from username to email
  password: string = '';
  securityQuestion: string = '';
  securityAnswer: string = '';
  passwordVisible: boolean = false;
  
  constructor(private router: Router, private authService: AuthService) {} // Inject AuthService

  openCity(evt: Event, cityName: string) {
    const tabcontent = document.getElementsByClassName("tabcontent") as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    const tablinks = document.getElementsByClassName("tablinks") as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
    }
    document.getElementById(cityName)!.style.display = "block";
    (evt.currentTarget as HTMLElement).classList.add("active");
  }

  setActiveTab(tab: string) {
    this.activeTab = tab; // Set the active tab
  }

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Login successful', response);
        localStorage.setItem("token",response)
        //this.router.navigate(['/reset']); // Redirect to home on success
        window.location.href='http://localhost:4200'
      },
      error => {
        console.error('Login failed', error);
        // Handle login error (e.g., show an error message)
        alert("Invalid credentials");
      }
    );
  }

  toggleForgotPassword() {
    this.showForgotPassword = !this.showForgotPassword; // Toggle visibility
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  // Method to handle security question verification
  verifySecurityQuestion() {
    console.log('Security Question Answered:', this.securityAnswer);
    // Add your verification logic here (e.g., API call)
  }

  navigateToReset() {
    this.router.navigate(['/reset']); // Adjust the path as necessary
  }
}
