import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../model/movie.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  apiUrl = 'http://localhost:1111/movies';

  getAllMovies(){
    return this.http.get<Movie[]>(this.apiUrl)
  }

  getMovieDetails(id: string) {
    return this.http.get<any>(`${this.apiUrl}/` + `${id}`);
  }

  addMovieToFavorites(movieId: string, userId: string): Observable<any> {
      const params = {
      movieId: movieId,
      userId: userId
    };

    // Set the Authorization header with the token
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json' // Typically included when sending data as JSON, but not strictly required for query params
    });

    // Send the request with query parameters
    return this.http.post(
      `${this.apiUrl}/favorites`,
      null, // No request body, just query params
      { headers: headers, params: params, responseType: 'json' } // Send parameters as query params
    );
  }

  getFavMovies(userId:string){
    const body={
      "userId":userId,
    }

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json' // Typically included when sending data as JSON
    });
    return this.http.post<any[]>(`${this.apiUrl}/favorites/get`,body, { headers: headers })
  }

  deleteFromFav(movieId:string,userId:string){
    const params = {
      movieId: movieId,
      userId: userId
    };

    // Set the Authorization header with the token
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    // Send the request with query parameters
    return this.http.delete(
      `${this.apiUrl}/favorites`,
      { headers: headers, params: params } // Send parameters as query params
    );

  }

}
