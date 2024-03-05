package com.springboot.aucta_backend.services;

import com.springboot.aucta_backend.modules.Rating;
import com.springboot.aucta_backend.modules.Review;
import com.springboot.aucta_backend.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> listReviews(Long movieIdReview){
        return reviewRepository.findByMovieIdReview(movieIdReview);
    }

    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }


}
