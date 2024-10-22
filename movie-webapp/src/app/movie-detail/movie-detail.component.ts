import { Component, OnInit } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Movie } from '../model/movie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  constructor(
    private movieService: MovieService,
    private activatedRoute:ActivatedRoute,
    public sanitizer: DomSanitizer,
    private authService:AuthService,
    private router:Router
  ) {}

  movieId=''
  movie: Movie | undefined;

  ngOnInit(): void {
    // Fetch the movie details using the id from the route

    this.activatedRoute.params.subscribe(
      data => {
        this.movieId = data['id'];
        this.movieService.getMovieDetails(this.movieId).subscribe(
          (res: Movie) => {
            this.movie = res;
            console.log(this.movie);
          },
          err => console.error(err)
        );
      },
      err => console.error(err)
    );


  }


  addToList(movie: Movie): void {
    const token = localStorage.getItem('token');  // Get the token from localStorage

    if (!token) {
      
      
        console.error("No token found in localStorage");
        //this.showAutoPopup('You must sign in to add movies to your watchlist.');
        alert("Please login for adding to wishlist")
        this.router.navigate(['/login'])
        return;
    }

    // First, get the user ID from the token
    this.authService.getUserIdFromToken(token).subscribe({
      next: (userId: string) => {
        // Now that we have the user ID, proceed to add the movie to favorites
        this.movieService.addMovieToFavorites(movie.id, userId).subscribe(
          res => {
            console.log("Movie added to favorites:", res);
            //alert("Added to favourite")
            this.showAutoPopup('Movie added to wishlists!'); 
          },
          err => {
            console.error("Error adding movie to favorites:", err);
            alert("Movie already added to favorites")
          }
        );
      },
      error: err => {
        console.error("Error retrieving user ID:", err);
      }
    });
    
}



showAutoPopup(message: string) {
  const popup = document.getElementById('autoPopup');
  const popupMessage = document.getElementById('popupMessage');

  if (popup && popupMessage) {
      popupMessage.textContent = message; // Set the message text
      popup.style.display = 'block'; // Show the popup

      setTimeout(() => {
          popup.style.display = 'none'; // Hide the popup after 3 seconds
      }, 3000); // Adjust the duration as needed
  }
}



}
