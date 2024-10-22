package com.example.movie_service.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "fav_movies") // Specify table name if necessary
@Getter
@Setter
public class FavMovie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column
    private String movieId;
    
    @Column
    private String userId;

    public FavMovie() {
        // Default constructor
    }

    public FavMovie(String movieId, String userId) {
        this.movieId = movieId;
        this.userId = userId;
    }
}
