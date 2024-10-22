package com.example.movie_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.movie_service.service.MovieService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("movies")
public class MovieController {

	@Autowired
    private MovieService movieService;

    @GetMapping
    @Cacheable("allMovies") // Caches the result of this method
    public List<Map<String, Object>> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("{id}")
    @Cacheable(value = "moviesById", key = "#id") // Caches the result based on movie ID
    public Map<String, Object> getMovieById(@PathVariable String id) {
        return movieService.getMovieById(id);
    }
}