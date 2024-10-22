package com.example.movie_service.repository;

import com.example.movie_service.model.FavMovie;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavMovieRepository extends JpaRepository<FavMovie, Integer> {
    List<FavMovie> findByUserId(String userId);
    @Transactional
    void deleteByMovieIdAndUserId(String movieId, String userId);
    Optional<FavMovie> findByMovieIdAndUserId(String movieId, String userId);
}
