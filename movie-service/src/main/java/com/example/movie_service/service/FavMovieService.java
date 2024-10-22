package com.example.movie_service.service;

import com.example.movie_service.model.FavMovie;

import java.util.List;

public interface FavMovieService {
    FavMovie addFavMovie(String movieId, String userId);
    void removeFavMovie(String movieId, String userId);
    List<FavMovie> getUserFavMovies(String userId);
}