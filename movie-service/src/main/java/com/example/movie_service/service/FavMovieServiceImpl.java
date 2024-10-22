package com.example.movie_service.service;

import com.example.movie_service.exception.MovieAlreadyExistsException;
import com.example.movie_service.exception.MovieNotFoundException;
import com.example.movie_service.model.FavMovie;
import com.example.movie_service.repository.FavMovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavMovieServiceImpl implements FavMovieService {

	@Autowired
    private FavMovieRepository favMovieRepository;


//    @Override
//    public FavMovie addFavMovie(String movieId, String userId) {
//        FavMovie favMovie = new FavMovie(movieId, userId);
//        return favMovieRepository.save(favMovie);
//    }
	
	@Override
	public FavMovie addFavMovie(String movieId, String userId) throws MovieAlreadyExistsException{
		
		 // Check if the movie is already in the user's favorite list
	    Optional<FavMovie> existingFavMovie = favMovieRepository.findByMovieIdAndUserId(movieId, userId);
	    
	    if (existingFavMovie.isPresent()) {
	        // Throw MovieAlreadyExistsException if the movie is already in the favorites
	        throw new MovieAlreadyExistsException("Movie with ID " + movieId + " is already a favorite for user " + userId);
	    }
		
	    FavMovie favMovie = new FavMovie(movieId, userId);
	    FavMovie savedMovie = favMovieRepository.save(favMovie);
	    
	    System.out.println("Saved movie: " + savedMovie);
	    return savedMovie;
	}

    @Override
    public void removeFavMovie(String movieId, String userId) {
        favMovieRepository.deleteByMovieIdAndUserId(movieId, userId);
    }

//    @Override
//    public List<FavMovie> getUserFavMovies(String userId) {
//    	List<FavMovie> favMovies=favMovieRepository.findByUserId(userId);
//    	if(favMovies!=null)
//    		return favMovies;
//    	return null;
//    }
    
    @Override
    public List<FavMovie> getUserFavMovies(String userId) throws MovieNotFoundException{
        List<FavMovie> favMovies = favMovieRepository.findByUserId(userId);
        
        if (favMovies != null && !favMovies.isEmpty()) {
            return favMovies;
        } else {  
        	// Throw the MovieNotFoundException if no favorite movies are found
        	 throw new MovieNotFoundException("No favorite movies found for user: " + userId);
        	 
        }
    }
}
