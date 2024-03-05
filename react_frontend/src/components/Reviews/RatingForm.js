import '../../App.css';
import 'react-bootstrap';
import axios from 'axios';
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

function RatingForm(){

    const [movie, setMovie] = useState(null);
    const [rating, setRating] = useState('');
    const { id } = useParams();
    const [formData, setFormData] = useState({
        movieId: '',
        rating: ''
    })
    const navigate = useNavigate();


    useEffect(() => {
        fetchMovieData(id);
    }, [id]);

    const fetchMovieData = async (id) => {
        const response = await axios.get(`http://localhost:8080/movies/${id}`)
            .catch(err => console.log(err));
        setMovie(response.data);
    }
    if (!movie) {
        return <p>Loading...</p>;
    }

    const saveRating = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8080/ratings", formData).then(response => {
            console.log(response.data)
            setFormData(
                {
                    movieId: '',
                    rating: ''
                }
            )
        }).catch(err => console.log(err));


    }

    const handleInputChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            movieId: `${id}`,
            [e.target.id]: e.target.value
        }));
        console.log(formData);
    };
    const handleBack = () => {
        navigate(`/movies/${id}`)
    }

    return(
      <div>
          <form className="w-50 text-start align-items-center justify-content-center mx-auto" onSubmit={saveRating}>
              <h1>{movie.title}</h1>
              <h5 className="fst-italic">Add your rating:</h5>
              <input type="number" min={1} max={10} id="rating" placeholder="Rating" onChange={(e) => handleInputChange(e)} />
              <button className="btn btn-light mx-3" type="submit">Save</button>
          </form>
          <button type="button" className="btn btn-lg btn-light my-3" onClick={handleBack}>Go back</button>
      </div>
    );
}
export default RatingForm;