package com.springboot.aucta_backend.services;

import com.springboot.aucta_backend.modules.Movie;
import com.springboot.aucta_backend.modules.Rating;
import com.springboot.aucta_backend.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.OptionalDouble;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;

    public Movie addMovie(Movie movie){
        return movieRepository.save(movie);
    }
    public List<Movie> listMovies(){
        return movieRepository.findAll();
    }
    public List<Movie> getFilteredMovies(String title, String genre, Integer year, Integer yearFrom, Integer yearTo){
        return movieRepository.findFilteredMovies(title, genre, year, yearFrom, yearTo);
    }
    public Optional<Movie> getMovieDetails(Long id){
        return movieRepository.findById(id);
    }

    public Double calculateAverageRating(Movie movie) {
        List<Rating> ratings = movie.getRatingList();
        if (ratings != null && !ratings.isEmpty()) {
            OptionalDouble average = ratings.stream()
                    .mapToInt(Rating::getRating)
                    .average();
            return average.orElse(0.0);
        }
        return 0.0;
    }
}
