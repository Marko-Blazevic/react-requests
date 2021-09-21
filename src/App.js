import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch('https://swapi.dev/api/films');
      if (!response.ok) {
        throw new Error('There was an error!');
      }
      const data = await response.json();
      const transformedData = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          releaseDate: movie.release_date,
          openingText: movie.opening_crawl,
        };
      });
      setMovies(transformedData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  let listDisplay;
  if (!isLoading && movies.length > 0) {
    listDisplay = <MoviesList movies={movies} />;
  }
  if (isLoading) {
    listDisplay = <p>Loading...</p>;
  }
  if (!isLoading && movies.length === 0) {
    listDisplay = <p>Movie list empty</p>;
  }
  if (error) {
    listDisplay = <p>{error}</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{listDisplay}</section>
    </React.Fragment>
  );
};

export default App;
