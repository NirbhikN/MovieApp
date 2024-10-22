import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  private userUrl='http://localhost:1111/users'

  getUserById(){
    return this.http.get<User>(this.userUrl)
  }

  // updateUser(user:User){
  //   return this.http.put<User>(this.userUrl,user);
  // }

  addUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:1111/auth/register', user);
  }

  deleteUser(id:any){
    return this.http.delete(`${this.userUrl}/${id}`,{responseType: 'text'})
  }

  resetPassword(email:any,answer:any,password:any ): Observable<any> {
    let forget={
      "email": email,
      "answer": answer,
      "newPassword": password
    }
    return this.http.post(`${this.userUrl}/reset-password`, forget,{responseType: 'text'});
  }
  
}
