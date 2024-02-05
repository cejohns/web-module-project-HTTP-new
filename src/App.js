import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";


import MovieList from './components/MovieList';
import Movie from './components/Movie';
import EditMovieForm from './components/EditMovieForm'; // Import the EditMovieForm component

import MovieHeader from './components/MovieHeader';
import FavoriteMovieList from './components/FavoriteMovieList';
import AddMovieForm from './components/AddMovieForm'; // Import the AddMovieForm component


import axios from 'axios';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

const deleteMovie = (id) => {
  axios.delete(`http://localhost:9000/api/movies/${id}`)
    .then(() => {
      // Filter out the movie with the given id
      const updatedMovies = movies.filter((movie) => movie.id !== id);
      setMovies(updatedMovies); // Update the movies list in the state
      // Redirect to /movies route
      navigate('/movies');
    })
    .catch(err => {
      console.error(err);
    });
};



const addToFavorites = (movie) => {
  if (!favoriteMovies.includes(movie)) {
    setFavoriteMovies([...favoriteMovies, movie]);
  }
}


  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Routes>
            <Route path="movies/edit/:id" element={<EditMovieForm />} />
            <Route path="movies/:id" element={<Movie addToFavorites={addToFavorites} />} />
            <Route path="movies" element={<MovieList movies={movies} deleteMovie={deleteMovie} />} />
            <Route path="movies" element={<MovieList movies={movies} />} />
            <Route path="/" element={<Navigate to="/movies" />} />
            <Route path="/movies/edit/:id" element={<EditMovieForm setMovies={setMovies} />} />
        <Route path="/movies/add" element={<AddMovieForm setMovies={setMovies} />} /> {/* Add this line */}
          </Routes>
        </div>
      </div>
    </div>
  );
};


export default App;
