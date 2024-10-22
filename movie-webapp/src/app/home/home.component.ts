import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../service/movie.service';
import { Movie } from '../model/movie.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allMovies: Movie[] = [];
  displayedMovies: Movie[] = [];
  trendingMovies: Movie[] = []; // Trending movies
  recommendedMovies: Movie[] = []; // Recommended movies
  length = 100; // Total number of top movies
  pageIndex = 0;
  recommendedLength = 50; // Total number of recommended movies
  recommendedPageIndex = 0;

  constructor(private router: Router, private movieSer: MovieService) {}

  ngOnInit(): void {
    this.getAllMovies();
    this.filteredMovies = this.allMovies;
  }

  getAllMovies() {
    this.movieSer.getAllMovies().subscribe(
      res => {
        this.allMovies = res;
        console.log("movies", this.allMovies);
        this.updateDisplayedMovies();
        this.updateRecommendedMovies(); // Initialize recommended movies
        this.setTrendingMovies(); // Set up trending movies
      },
      err => console.error(err)
    );
  }

  updateDisplayedMovies(): void {
    const start = this.pageIndex * 4; // 4 movies per page for Top Movies
    this.displayedMovies = this.allMovies.slice(start, start + 8);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.updateDisplayedMovies();
  }

  updateRecommendedMovies(): void {
    this.recommendedMovies = this.getRandomMovies(this.allMovies.slice(0, 50), 8); // Get random movies from ranks 1-50
    this.recommendedLength = this.recommendedMovies.length; // Update the paginator length
  }

  onRecommendedPageChange(event: PageEvent): void {
    this.recommendedPageIndex = event.pageIndex;
    this.updateRecommendedMovies(); // Call to update the recommended movies based on pagination
  }

  setTrendingMovies(): void {
    this.trendingMovies = this.allMovies.slice(0, 20); // Trending movies with ranks < 20
  }

  goToMovie(id: string) {
    this.router.navigate(['/movie', id]);
  }

  getRandomMovies(movies: Movie[], count: number): Movie[] {
    const shuffled = movies.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }






  searchText: string = '';
  filteredMovies: any[] = [];
  selectedMovie: any = null; // Variable to hold the selected movie

  hover: boolean = false; 



  onSearch() {
    console.log("Searching for:", this.searchText);
    this.filteredMovies = this.allMovies.filter(movie => this.isMatch(movie));
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
    this.router.navigate(['/movie/'+movie.id]);
  }


}
