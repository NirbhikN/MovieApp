package com.example.movie_service.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.example.movie_service.exception.MovieNotFoundException;

@Service
public class MovieServiceImpl implements MovieService {

    private final RestTemplate restTemplate;
    private List<Map<String, Object>> cachedMovies; // Cache for the movies
    private Map<String, Object> cachedMovie;


    public MovieServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public List<Map<String, Object>> getAllMovies() {
        StringBuilder url = new StringBuilder("https://imdb-top-100-movies.p.rapidapi.com/");

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.add("x-rapidapi-key", "e0fe4e5cc5msh5012631111981b0p13aa1bjsn4a5882c206dd");
        headers.add("x-rapidapi-host", "imdb-top-100-movies.p.rapidapi.com");

        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Call the external API
        ResponseEntity<List<Map<String, Object>>> response;
        try {
            response = restTemplate.exchange(url.toString(), HttpMethod.GET, entity, new ParameterizedTypeReference<List<Map<String, Object>>>() {});
            cachedMovies = response.getBody(); // Cache the movies
        } catch (RestClientException e) {
            throw new RuntimeException("Failed to fetch movies", e);
        }

        return cachedMovies;
    }

    @Override
    public Map<String, Object> getMovieById(String movieId) {

    	 StringBuilder url = new StringBuilder("https://imdb-top-100-movies.p.rapidapi.com/"+movieId);

         // Set headers
         HttpHeaders headers = new HttpHeaders();
         headers.add("x-rapidapi-key", "e0fe4e5cc5msh5012631111981b0p13aa1bjsn4a5882c206dd");
         headers.add("x-rapidapi-host", "imdb-top-100-movies.p.rapidapi.com");

         HttpEntity<String> entity = new HttpEntity<>(headers);

         // Call the external API
         ResponseEntity<Map<String, Object>> response;
         try {
             response = restTemplate.exchange(url.toString(), HttpMethod.GET, entity, new ParameterizedTypeReference<Map<String, Object>>() {});
             cachedMovie = response.getBody(); // Cache the movies
         } catch (RestClientException e) {
             throw new RuntimeException("Failed to fetch movies", e);
         }
         
         return cachedMovie;
    	
    }
}

