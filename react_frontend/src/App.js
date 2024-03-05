import './App.css';
import 'react-bootstrap';
import axios from 'axios';
import {useEffect, useState} from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import Movies from "./components/Movies/Movies";
import CreateMovie from "./components/Movies/CreateMovie";
import SingleMovie from "./components/Movies/SingleMovie";
import ReviewForm from "./components/Reviews/ReviewForm";
import RatingForm from "./components/Reviews/RatingForm";


function App() {

   const navigate = useNavigate();

   const navigateToMovies = () => {
       navigate('/movies');
   }
   const navigateToCreateMovie = () => {
       navigate('/movies/create');
   }

  return (

    <div className="App" style={{fontFamily: "Arial"}}>
        <div className="text-center align-items-center justify-content-center">
            <h2 className="mt-2 text-bg-light py-2">Welcome to our Movie <span className="titlename" >Rating</span> and <span className="titlename">Review</span> Platform!</h2>
            <button className="btn btn-primary mx-5 mt-2 mb-5" onClick={navigateToMovies}>View Movie List</button>
            <button className="btn btn-secondary mx-5 mt-2 mb-5" onClick={navigateToCreateMovie}>Add a new movie</button>
        </div>


        <Routes>
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/create" element={<CreateMovie />} />
            <Route path="/movies/:id" element={<SingleMovie/>} />
            <Route path="/movies/:id/reviews/create" element={<ReviewForm />}/>
            <Route path="/movies/:id/rate" element={<RatingForm />}/>
        </Routes>
    </div>


  );
}

export default App;
