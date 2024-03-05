package com.springboot.aucta_backend.controllers;

import com.springboot.aucta_backend.modules.Movie;
import com.springboot.aucta_backend.modules.Rating;
import com.springboot.aucta_backend.modules.Review;
import com.springboot.aucta_backend.repositories.MovieRepository;
import com.springboot.aucta_backend.services.MovieService;
import com.springboot.aucta_backend.services.RatingService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/")
public class RatingController {

    private final RatingService ratingService;

    @Autowired
    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @GetMapping
    public ResponseEntity<List<Rating>> getAllRatings() {
        List<Rating> ratings = ratingService.getAllRatings();
        return ResponseEntity.ok(ratings);
    }

    @GetMapping("/ratings/{id}")
    public ResponseEntity<Rating> getRatingById(@PathVariable Long id) {
        Optional<Rating> rating = ratingService.getRatingById(id);
        return rating.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/ratings")
    public ResponseEntity<Rating> saveRating(@RequestBody Rating rating) {
        Rating savedRating = ratingService.saveRating(rating);
        return new ResponseEntity<>(savedRating, HttpStatus.CREATED);
    }

}