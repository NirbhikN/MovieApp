package com.example.movie_service.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface MovieService {
	List<Map<String, Object>> getAllMovies();
	Map<String, Object> getMovieById(String movieId);
}
