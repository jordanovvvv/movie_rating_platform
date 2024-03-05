package com.springboot.aucta_backend.controllers;

import com.springboot.aucta_backend.modules.Movie;
import com.springboot.aucta_backend.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/")
public class MovieController {
    @Autowired
    private MovieService movieService;

    @PostMapping("/movies/create")
    public ResponseEntity<Movie> addMovie(@RequestBody Movie movie){
        Movie addedMovie = movieService.addMovie(movie);
        return new ResponseEntity<>(addedMovie, HttpStatus.CREATED);
    }

    @GetMapping("/movies")
    public ResponseEntity<List<Movie>> listMovies(


            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy){

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        List<Movie> movies = movieService.listMovies();
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }
    @GetMapping("/movies/filtered")
    public ResponseEntity<List<Movie>> getFilteredMovies(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer yearFrom,
            @RequestParam(required = false) Integer yearTo) {
        List<Movie> filteredMovies = movieService.getFilteredMovies(title, genre, year, yearFrom, yearTo);
        return new ResponseEntity<>(filteredMovies, HttpStatus.OK);
    }

    @GetMapping("/movies/{id}")
    public ResponseEntity<Movie> getMovieDetails(@PathVariable Long id){
        Optional<Movie> movie = movieService.getMovieDetails(id);
        return movie.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/movies/{id}/average-rating")
    public ResponseEntity<Double> getAverageRating(@PathVariable Long id) {
        Optional<Movie> movie = movieService.getMovieDetails(id);
        if (movie.isPresent()) {
            Double averageRating = movieService.calculateAverageRating(movie.get());
            return ResponseEntity.ok(averageRating);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
