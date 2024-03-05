package com.springboot.aucta_backend.modules;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "movie_id")
    private Long movieIdReview;

    private String reviewText;

    public Review(){};

    public Review(Long id, Long movieIdReview, String reviewText) {
        this.id = id;
        this.movieIdReview = movieIdReview;
        this.reviewText = reviewText;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMovieIdReview() {
        return movieIdReview;
    }

    public void setMovieIdReview(Long movieIdReview) { this.movieIdReview = movieIdReview; }


    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }
}
