import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service'; // Import AuthService
import { Location } from '@angular/common';  // Import the Location service


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User | undefined;
  updateForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private authService: AuthService, private location: Location) {
    this.updateForm = new FormGroup({
      userName: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phoneNo: new FormControl('')
    });
  }

  ngOnInit(): void {
    let token="";
    token=localStorage.getItem("token")+"";
    // Subscribe to userData$ observable to get user details
    this.authService.userData$.subscribe(
      userData => {
        this.user = userData;
        // Set the values directly in the form controls
        if (this.user) {
          //this.updateForm.controls['userName'].setValue(this.user.userName);
          this.updateForm.controls['firstName'].setValue(this.user.firstName);
          this.updateForm.controls['lastName'].setValue(this.user.lastName);
          this.updateForm.controls['email'].setValue(this.user.email);
          this.updateForm.controls['phoneNo'].setValue(this.user.phoneNo);
        }
      },
      err => {
        console.error('Failed to fetch user data', err);
      }
    );
    this.authService.fetchUserDetails(token);
  }

  goBack() {
    this.location.back();  // This will take the user to the previous page in history
  }

  editUser() {
    if (this.updateForm.valid) {
      const updatedUser = { ...this.user, ...this.updateForm.value }; // Merge existing user data with updated form values
      this.authService.editUser(updatedUser).subscribe(
        res => {
          alert("User updated");
          this.router.navigate(['/user']); 
        },
        err => console.log(err)
      );
    }
  }

  deleteUser() {
    if (confirm('Are you sure you want to delete your account?')) {
      this.userService.deleteUser(this.user?.id).subscribe(
        res=>{
          alert('User Deleted')
          localStorage.clear();
          window.location.href = '/'
        },
        err=>console.error(err)
      )
      console.log('User deleted', this.user?.id);
    }
  }
}
