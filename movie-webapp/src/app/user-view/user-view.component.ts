import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
})
export class UserViewComponent implements OnInit {

  constructor(private userService:UserService, private router:Router,private authService: AuthService){}

  user:User|undefined

  // ngOnInit(): void {
  //   this.userService.getUserById().subscribe(
  //     res=>this.user=res,
  //     err=>console.log(err)
  //   )
  // }

  ngOnInit(): void {
    let token="";
    token=localStorage.getItem("token")+"";

    // Subscribe to userData$ observable to get user details
    this.authService.userData$.subscribe(
      userData => {
        this.user = userData;
      },
      err => {
        console.error('Failed to fetch user data', err);
      }
    );
    this.authService.fetchUserDetails(token);
  }

  goToEdit() {
    this.router.navigate(['user/edit'])
  }
}
