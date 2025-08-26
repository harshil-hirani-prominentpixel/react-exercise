import { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";
import type { MovieType, NewMovieType } from "./types";
interface SwapiFilm {
  episode_id: number;
  title: string;
  opening_crawl: string;
  release_date: string;
}
interface SwapiResponse {
  results: SwapiFilm[];
}
function App() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.py4e.com/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data: SwapiResponse = await response.json();
      const transformedMovies: MovieType[] = data.results.map((movieData) => {
        return {
          id: movieData.episode_id.toString(),
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);
  function addMovieHandler(movie: NewMovieType) {
    console.log(movie);
  }
  let content = <p>Found no movies.</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  return (
    <>
      {" "}
      <section>
        {" "}
        <AddMovie onAddMovie={addMovieHandler} />{" "}
      </section>{" "}
      <section>
        {" "}
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>{" "}
      </section>{" "}
      <section>{content}</section>{" "}
    </>
  );
}
export default App;
