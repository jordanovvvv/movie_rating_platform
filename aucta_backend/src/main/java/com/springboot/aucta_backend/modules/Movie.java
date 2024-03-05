package com.springboot.aucta_backend.modules;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String genre;
    private Integer year;

    @OneToMany(mappedBy = "movie_id", cascade = CascadeType.ALL)
    List<Rating> ratings;

    @OneToMany(mappedBy = "movieIdReview", cascade = CascadeType.ALL)
    List<Review> reviews;

    public Movie(){};

    public Movie(Long id, String title, String description, String genre, Integer year) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.genre = genre;
        this.year = year;
    }


    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getGenre() {
        return genre;
    }

    public int getYear() {
        return year;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public List<Rating> getRatingList() {
        return ratings;
    }

    public void setRatingList(List<Rating> ratings) {
        this.ratings = ratings;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }
}
