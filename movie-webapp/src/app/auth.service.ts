import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { tap, catchError, map } from 'rxjs/operators';
import { User } from './model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:1111/auth'; // Adjust to your backend URL
  private token: string | null = null;
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  private userData: any = null; // Store user data here
  private userDataSubject = new BehaviorSubject<any>(null); // Observable for user data
  userData$ = this.userDataSubject.asObservable();

  // Observable to expose login state
  isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Check if a token exists on initialization
    this.token = localStorage.getItem('token');
    this.loggedInSubject.next(!!this.token);
  }
  private checkInitialLoginState(): boolean {
    return !!localStorage.getItem('token');
  }

  // Method to register a user
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      tap((response: any) => {
        if (response.user) { // Assuming response contains user data
          this.userData = response.user;
          this.userDataSubject.next(this.userData);
          this.loggedInSubject.next(true); // Update login state
        }
      }),
      catchError(this.handleError)
    );
  }

  // Method to login a user
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body,{responseType: 'text'})
  }

  // Fetch user details based on user ID
   fetchUserDetails(userId: string) {
    const headers = { Authorization: `Bearer ${this.token}` };
    this.http.get<any>(`http://localhost:1111/auth/get-user`, { headers })
      .subscribe(user => {
        this.userData = user;
        this.userDataSubject.next(this.userData);
      }, error => {
        console.error('Failed to fetch user details', error);
      });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage); // Log to console
    return throwError(errorMessage); // Return observable with error
  }

  // Method to logout a user
  logout(): void {
    this.token = null;
    this.userData = null; // Clear user data on logout
    localStorage.removeItem('token');
    alert('Logged Out')
    this.loggedInSubject.next(false); // Update login state
    this.userDataSubject.next(null); // Clear user data observable
    this.router.navigate(['/']); // Redirect to login page
  }
  
  editUser(user: User): Observable<User> {
    const headers = { 'Authorization': `Bearer ${this.token}` }; // Add the token if needed
    return this.http.put<User>(`http://localhost:1111/auth/update-user`, user, { headers })
        .pipe(
            catchError(this.handleError)
        );
}


  // Method to check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.token; // Check if token exists
  }


  // Get user id from token
  getUserIdFromToken(token: any): Observable<string> {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any>(`http://localhost:1111/auth/get-user`, { headers }).pipe(
      map(res => {
        console.log("id", res.id);  // Log the user id for debugging
        return res.id;  // Return the user ID to the caller
      }),
      catchError(err => {
        console.error("Error retrieving user ID", err);
        throw err;  // Propagate the error
      })
    );
}
}
