 import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MovieService } from '../service/movie.service';
import { Movie } from '../model/movie.model';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  constructor(private router: Router, private authService:AuthService, private movieService:MovieService) {}


  wishlistMovies:any[]=[]
  token=''

  ngOnInit(): void {
    this.token=""+localStorage.getItem('token');
    this.getUserFavMovies()
}

  goToMovie(movie: any) {
    this.router.navigate(['/movie/'+movie.id]);
  }

  // the below is the code for search functionality in wishlist

  searchText: string = '';
  filteredMovies: any[] = [];
  selectedMovie: any = null; // Variable to hold the selected movie

  hover: boolean = false; 

  onSearch() {
    console.log("Searching for:", this.searchText);
    this.filteredMovies = this.wishlistMovies.filter(movie => this.isMatch(movie));
    console.log("Filtered movies:", this.filteredMovies);
    // Reset selected movie when searching
    this.selectedMovie = null;
  }

  

  private isMatch(movie: any): boolean {
    const lowerCaseSearchText = this.searchText.toLowerCase();
    return movie.title.toLowerCase().includes(lowerCaseSearchText);
  }

  goToMovieTitle(movie: any) {
    // Set the selected movie to display its details
    this.selectedMovie = movie;
  }

  getUserFavMovies() {
    // Extract userId from the token
    this.authService.getUserIdFromToken(this.token).subscribe(
      (res) => {
        // Call service to get favorite movies for the user
        this.movieService.getFavMovies(res).subscribe(
          (resp: any[]) => {  // Cast resp to an array of objects (assumed to be an array of favorite movies)
            console.log("Favorite movies", resp); // Check the structure of resp
  
            // Get all movies and filter them based on the favorite movie IDs
            this.movieService.getAllMovies().subscribe(
              (allMovies) => {
                // Extract favorite movie IDs
                const favoriteMovieIds = resp.map((favMovie: any) => favMovie.movieId);  // Assuming resp contains { movieId: number }
  
                // Filter all movies based on the favorite movie IDs
                this.wishlistMovies = allMovies.filter((movie: any) =>
                  favoriteMovieIds.includes(movie.id)
                );
  
                console.log("Wishlist Movies", this.wishlistMovies);
              },
              (err) => console.error("Error fetching all movies", err)
            );
          },
          (err) => console.error("Error fetching favorite movies", err)
        );
      },
      (err) => console.error("Error fetching user ID from token", err)
    );
  }

  deleteFromList(movieId:string){
    this.authService.getUserIdFromToken(this.token).subscribe(
      (res) => {
        this.movieService.deleteFromFav(movieId,res).subscribe(
          resp=>{
            this.showAutoPopup('Movie Deleted!')
            window.location.reload();    
                },
          err=>console.error(err)
          
        )

      },
      err=>console.error(err)
  )}
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