package com.springboot.aucta_backend.controllers;

import com.springboot.aucta_backend.modules.Movie;
import com.springboot.aucta_backend.modules.Review;
import com.springboot.aucta_backend.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @GetMapping("/reviews/{id}")
    public ResponseEntity<List<Review>> listReviews(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy){
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        List<Review> reviews = reviewService.listReviews(id);
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @PostMapping("/reviews/create")
    public ResponseEntity<Review> saveReview(@RequestBody Review review){
        Review savedReview = reviewService.saveReview(review);
        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }
}
