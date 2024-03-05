import '../../App.css';
import 'react-bootstrap';
import axios from 'axios';
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

function ReviewForm(){
    const [movie, setMovie] = useState(null);
    const { id } = useParams();
    const [formData, setFormData] = useState({
        movieIdReview: '',
        reviewText : ''
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

    const saveReview = (e) => {
        e.preventDefault();


        axios.post("http://localhost:8080/reviews/create", formData)
            .then(response => {
                console.log(response.data)
                setFormData({
                    movieIdReview: '',
                    reviewText: ''
                })
            }).catch(err => console.log(err));
    }

    const handleInputChange = (e) => {
        setFormData((prevFormData ) => ({
            ...prevFormData,
            movieIdReview: `${id}`,
            [e.target.id]: e.target.value
        }));
    }
    const handleBack = () => {
        navigate(`/movies/${id}`)
    }

    return(
      <div>
          <form className="w-50 text-start align-items-center justify-content-center mx-auto" onSubmit={saveReview}>
              <h1>{movie.title}</h1>
              <div className="form-group">
                  <h5 className="fst-italic">Add your review here:</h5>
                  <input type="text"
                         className="form-control"
                         id="reviewText"
                         onChange={e => handleInputChange(e)}
                         value={formData.reviewText}
                  />
              </div>
              <button className="btn btn-light mt-3" type="submit">Save</button>
          </form>
          <button type="button" className="btn btn-lg btn-light my-3" onClick={handleBack}>Go back</button>
      </div>
    );
}
export default ReviewForm;