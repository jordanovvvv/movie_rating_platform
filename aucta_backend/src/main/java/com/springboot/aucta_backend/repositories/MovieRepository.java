package com.springboot.aucta_backend.repositories;

import com.springboot.aucta_backend.modules.Movie;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    @Query("SELECT m FROM Movie m WHERE " +
            "(:title IS NULL OR m.title LIKE %:title%) " +
            "AND (:genre IS NULL OR m.genre LIKE %:genre%) " +
            "AND (:year IS NULL OR m.year = :year)" +
            "AND (:yearFrom IS NULL OR :yearTo IS NULL OR m.year BETWEEN :yearFrom AND :yearTo)"

    )
    List<Movie> findFilteredMovies(
            @Param("title") String title,
            @Param("genre") String genre,
            @Param("year") Integer year,
            @Param("yearFrom") Integer yearFrom,
            @Param("yearTo") Integer yearTo);

}
