import '../../App.css';
import 'react-bootstrap';
import axios from 'axios';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function CreateMovie(){

    const [movies, setMovies] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        genre: '',
        year: ''
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8080/movies/create", formData)
            .then(response => {
                console.log(response.data);
                setMovies([...movies, response.data]);
                setFormData({
                    title: '',
                    description: '',
                    genre: '',
                    year: '',
                });
            })
            .catch(error => console.error(error));
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleBack = () => {
        navigate('/movies')
    }

    return(
        <div>
            <form className="w-50 text-start align-items-center justify-content-center mx-auto" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter movie title"
                        onChange={handleInputChange}
                        value={formData.title}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        placeholder="Enter movie description"
                        onChange={(e) => handleInputChange(e)}
                        value={formData.description}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Genre</label>
                    <select className="form-control" id="genre" value={formData.genre} onChange={(e) => handleInputChange(e)} >
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
                </div>
                <div className="form-group">
                    <label htmlFor="year">Year of release</label>
                    <input type="number" min="1900" max="2024" className="form-control" id="year" placeholder="Range 1900-2024" value={formData.year} onChange={(e) => handleInputChange(e)}/>
                </div>

                <button type="submit" className="btn btn-primary my-3">Submit</button>
            </form>
            <button type="button" className="btn btn-lg btn-light my-3" onClick={handleBack}>Go back</button>
        </div>
    );
}
export default CreateMovie;