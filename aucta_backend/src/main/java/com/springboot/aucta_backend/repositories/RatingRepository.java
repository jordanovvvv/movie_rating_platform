package com.springboot.aucta_backend.repositories;

import com.springboot.aucta_backend.modules.Rating;
import com.springboot.aucta_backend.modules.Review;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Long> {

}
