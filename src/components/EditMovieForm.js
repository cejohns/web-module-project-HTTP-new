import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import axios from 'axios';

const EditMovieForm = (props) => {
   const { id } = useParams();
  const navigate = useNavigate();
 

  //const { setMovies } = props;
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    genre: "",
    metascore: 0,
    description: ""
  });

  useEffect(() => {
    // Fetch the movie data when the component mounts or when id changes
    axios.get(`http://localhost:9000/api/movies/${id}`)
      .then(res => {
        setMovie(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]); // Only re-run the effect if the id changes


  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:9000/api/movies/${id}`, movie)
      .then(() => {
        // After a successful update, fetch the updated list of movies or update the local list
        axios.get('http://localhost:9000/api/movies')
          .then(response => {
            // Update the global movies state with the new list of movies
            props.setMovies(response.data);
            // Redirect to the movie's individual info page
            navigate(`/movies/${id}`); // This line redirects the user
          })
          .catch(error => {
            console.error('There was an error fetching the movies:', error);
          });
      })
      .catch(error => {
        console.error('There was an error updating the movie:', error);
      });
  };
  

  const { title, director, genre, metascore, description } = movie;

  return (
    <div className="col">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h4 className="modal-title">Editing <strong>{movie.title}</strong></h4>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Title</label>
              <input value={title} onChange={handleChange} name="title" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Director</label>
              <input value={director} onChange={handleChange} name="director" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Genre</label>
              <input value={genre} onChange={handleChange} name="genre" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Metascore</label>
              <input value={metascore} onChange={handleChange} name="metascore" type="number" className="form-control" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={description} onChange={handleChange} name="description" className="form-control"></textarea>
            </div>

          </div>
          <div className="modal-footer">
            <input type="submit" className="btn btn-info" value="Save" />
            <Link to={`/movies/1`}><input type="button" className="btn btn-default" value="Cancel" /></Link>
          </div>
        </form>
      </div>
    </div>);
}

export default EditMovieForm;
