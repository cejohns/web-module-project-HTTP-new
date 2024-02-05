import React from 'react';

import MovieListItem from './MovieListItem';
import MovieFooter from './MovieFooter';
import FavoriteMovieList from './FavoriteMovieList';

const MovieList = (props) => {
  const { movies, favoriteMovies, deleteMovie  } = props;

  return (
    <div className="col">
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>Title</th>
          <th>Director</th>
          <th>Genre</th>
          <th>Metascore</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          movies.map(movie => (
            // Pass the deleteMovie function as a prop to MovieListItem
            <MovieListItem key={movie.id} movie={movie} deleteMovie={deleteMovie} />
          ))
        }
      </tbody>
    </table>
    <MovieFooter totalMovies={movies.length} />
  </div>
  );
}

export default MovieList;
