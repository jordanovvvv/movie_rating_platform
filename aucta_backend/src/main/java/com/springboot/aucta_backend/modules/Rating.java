package com.springboot.aucta_backend.modules;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;

import java.util.Map;

@Entity
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "movie_id")
    private Long movie_id;

    @Nullable
    private Integer rating;

    public Rating(){};

    public Rating(Long id, Long movie_id, Integer rating) {
        this.id = id;
        this.movie_id = movie_id;
        this.rating = rating;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMovieId() {
        return movie_id;
    }

    public void setMovieId(Long movie_id) { this.movie_id = movie_id; }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }
}
