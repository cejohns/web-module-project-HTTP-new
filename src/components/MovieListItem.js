import React from 'react';
import { Link } from 'react-router-dom';

const MovieListItem = (props) => {
  const { id, title, director, genre, metascore } = props.movie;
  const { deleteMovie } = props; // Accept the deleteMovie function as a prop

  return (
    <tr key={id}>
      <td>{title}</td>
      <td>{director}</td>
      <td>{genre}</td>
      <td>{metascore}</td>
      <td>
        <Link to={`/movies/${id}`} className="view">
          <input type="button" className="btn btn-secondary" value="View" />
        </Link>
        {/* Add a delete button */}
        <input 
          type="button" 
          className="btn btn-danger" 
          value="Delete" 
          onClick={() => deleteMovie(id)} // Call the deleteMovie function with the movie's id
        />
      </td>
    </tr>
  );
}

export default MovieListItem;
