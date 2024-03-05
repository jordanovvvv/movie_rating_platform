import '../../App.css';
import 'react-bootstrap';
import axios from 'axios';
import {useEffect, useState} from "react";
import {Routes, Route, useNavigate, useParams} from 'react-router-dom';

function SingleMovie(){
    const [movie, setMovie] = useState(null);
    const [rating, setRating] = useState(null);
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    // const id = match.params.id;
    const { id } = useParams();

    useEffect(() => {
        fetchMovieData(id);
        fetchReviews(id);
    }, [id]);

    const fetchMovieData = async (id) => {
        const response = await axios.get(`http://localhost:8080/movies/${id}`)
            .catch(err => console.log(err));
        console.log(response.data);
        setMovie(response.data);

        const ratingResponse = await axios.get(`http://localhost:8080/movies/${id}/average-rating`);
        setRating(ratingResponse.data);

    }

    const fetchReviews = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/reviews/${id}`);
            console.log(response.data);
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };


    if (!movie) {
        return <p>Loading...</p>;
    }




    function navigateToReview(){
        navigate(`/movies/${id}/reviews/create`);
    }
    function navigateToRate(){
        navigate(`/movies/${id}/rate`);
    }
    const handleDelete = () => {
        axios.delete(`http://localhost:8080/movies/${id}`)
            .then(() => {
                console.log('Movie deleted successfully');
            })
            .catch(error => console.error('Error deleting movie:', error));
    };

    return(
        <div className="container">
            <div className="card mx-auto" style={{width: "50em"}}>
                <h2 className="card-header">{movie.title}</h2>
                <div className="card-body">
                    <p><span className="fst-italic">Description:</span> {movie.description}</p>
                    <p><span className="fst-italic">Genre:</span> {movie.genre}</p>
                    <p><span className="fst-italic">Year of release:</span> {movie.year}</p>
                    <p><span className="fst-italic">Average rating:</span> {Math.round(rating * 100)/100} </p>
                    <div className="card-footer">
                        <button className="btn btn-outline-primary mx-3" onClick={navigateToReview}>Add Review</button>
                        <button className="btn btn-outline-secondary mx-3" onClick={navigateToRate}>Add Rating</button><br/>
                    </div>

                </div>

            </div>


            <div className="mt-5 mx-auto" style={{width: "50em"}}>
                <h3 className="pb-3">Reviews</h3>
                <ul className="mx-auto">
                    {reviews.map(review => (
                        <li key={review.id} className="card my-2 text-start">
                            <div className="card-body">
                                <label className="card-title fst-italic">Anonymous user</label>
                                <p className="card-text" >{review.reviewText}</p>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default SingleMovie;