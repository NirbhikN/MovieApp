import { Pipe, PipeTransform } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Movie } from './model/movie.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(movies: Movie[], searchText: string): Movie[] {
    if (!movies || !searchText) {
      return movies;
    }
    const lowerCaseSearchText = searchText.toLowerCase();
    return movies.filter(movie =>
      movie.title.toLowerCase().includes(lowerCaseSearchText) 
    );
  }
    

}
