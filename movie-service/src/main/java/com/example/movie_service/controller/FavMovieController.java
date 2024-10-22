package com.example.movie_service.controller;

import com.example.movie_service.model.FavMovie;
import com.example.movie_service.service.FavMovieService;

import jakarta.ws.rs.NotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/movies/favorites")
public class FavMovieController {

	@Autowired
    private  FavMovieService favMovieService;

    @PostMapping
    public FavMovie addFavMovie(@RequestParam String movieId, @RequestParam String userId) {
        return favMovieService.addFavMovie(movieId, userId);
    }

    @DeleteMapping
    public void removeFavMovie(@RequestParam String movieId, @RequestParam String userId) {
        favMovieService.removeFavMovie(movieId, userId);
    }

    @PostMapping("/get")
    public ResponseEntity<List<FavMovie>> getUserFavMovies(@RequestBody UserRequest userRequest) {
        List<FavMovie> favMovies = favMovieService.getUserFavMovies(userRequest.getUserId());
        if (favMovies != null && !favMovies.isEmpty()) {
            return new ResponseEntity<>(favMovies, HttpStatus.OK);  // Return 200 OK if found
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);  // Return 404 if not found
        }
    }
    
    static class UserRequest {
        private String userId;

        public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }
    }

}


