import '../../App.css';
import 'react-bootstrap';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import {render} from "@testing-library/react";

function Movies(){
    const [movies, setMovies] = useState([]);
    const [ratings, setRatings] = useState({});
    const navigate = useNavigate();
    const [titleFilter, setTitleFilter] = useState('');
    const [genreFilter, setGenreFilter] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [yearFromFilter, setYearFromFilter] = useState('');
    const [yearToFilter, setYearToFilter] = useState('');

    const handleYearChange = (e) => {
        setYearFilter(e.target.value);
        setYearFromFilter('');
        setYearToFilter('');
    };

    const handleYearFromChange = (e) => {
        setYearFromFilter(e.target.value);
        setYearFilter('');
    };

    const handleYearToChange = (e) => {
        setYearToFilter(e.target.value);
        setYearFilter('');
    };


    const fetchMovies = async () => {
        const response = await axios.get("http://localhost:8080/movies")
            .catch(err => console.log(err));
        setMovies(response.data);

    }
    const fetchAverageRating = async () => {

        const averageRatingResponse = await Promise.all(
            movies.map(movie => axios.get(`http://localhost:8080/movies/${movie.id}/average-rating`)
            )
        );

        const averageRatingsData = averageRatingResponse.map(response => response.data);


        const ratingsMap = {};
        averageRatingsData.forEach((rating, index) => {
            ratingsMap[movies[index].id] = rating;
        });
        setRatings(ratingsMap);
    }

    useEffect(() => {
        fetchMovies();
        fetchAverageRating();
    }, []);



    function handleMovieClick(id) {
        navigate(`/movies/${id}`)
    }

    const handleFilterSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.get("http://localhost:8080/movies/filtered",
            {
                params: {
                    title: titleFilter,
                    genre: genreFilter,
                    year: yearFilter,
                    yearFrom: yearFromFilter,
                    yearTo: yearToFilter
                }
            });
        setMovies(response.data);
    }
    const handleResetFilter = (e) => {
        e.preventDefault();

        fetchMovies();
        setTitleFilter('');
        setGenreFilter('');
        setYearFilter('');
        setYearFromFilter('');
        setYearToFilter('');
    }
    if (!movies) {
        return <p>Looks like you have to add some movies first...</p>;
    }

    return(
        <div>
            <h2>Movies</h2>
            <div>
                <form onSubmit={handleFilterSubmit} >
                    <label >
                        Title:
                        <input type="text" value={titleFilter} onChange={(e) => setTitleFilter(e.target.value)} className="me-3 ms-1" />
                    </label>
                    <label>
                        Genre:
                        <select  id="genre" value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)} className="me-3 ms-1" >
                            <option selected disabled value="">Select movie genre</option>
                            <option>Action</option>
                            <option>Adventure</option>
                            <option>Thriller</option>
                            <option>Horror</option>
                            <option>Romance</option>
                            <option>Comedy</option>
                            <option>Drama</option>
                            <option>Western</option>
                            <option>Sci-fi</option>
                        </select>

                    </label>
                    <label>
                        Year:
                        <input
                            type="number"
                            min={1900}
                            max={2024}
                            value={yearFilter}
                            onChange={handleYearChange}
                            disabled={!!yearFromFilter || !!yearToFilter}
                            className="me-3 ms-1"
                        />
                    </label>
                    <label>Year From - Year To:</label>
                    <input
                        type="number"
                        min={1900}
                        max={2024}
                        value={yearFromFilter}
                        onChange={handleYearFromChange}
                        disabled={!!yearFilter}
                        className="me-1 ms-1"
                    />
                    <input
                        type="number"
                        min={1900}
                        max={2024}
                        value={yearToFilter}
                        onChange={handleYearToChange}
                        disabled={!!yearFilter}
                        className="me-3 ms-1"
                    />
                    <button type="submit" className="btn btn-primary">Filter</button>
                    <button type="button" className="btn btn-secondary ms-2" onClick={handleResetFilter}>Reset</button>
                </form>
            </div>
            <table className="table styled-table" style={{fontFamily: "Arial"}}>
                <thead>
                <tr style={{fontStyle: "italic"}}>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Genre</th>
                    <th>Year</th>
                    <th>Average Rating</th>
                </tr>
                </thead>
                <tbody style={{cursor: "pointer"}}>
                {movies.map(movie => (
                    <tr key={movie.id} onClick={() => handleMovieClick(movie.id)} >
                        <td>{movie.title}</td>
                        <td>{movie.description}</td>
                        <td>{movie.genre}</td>
                        <td>{movie.year}</td>
                        <td>{ratings[movie.id] ? (Math.round(ratings[movie.id] * 100) / 100) : "Rating not available"}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>

        );

}
export default Movies;