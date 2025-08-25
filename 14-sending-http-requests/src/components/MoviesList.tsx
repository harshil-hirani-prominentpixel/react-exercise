import React from "react";
import Movie from "./Movie";
import classes from "./MoviesList.module.css";

export type MovieType = {
  id: string;
  title: string;
  releaseDate: string;
  openingText: string;
};

type MoviesListProps = {
  movies: MovieType[];
};

export const MoviesList: React.FC<MoviesListProps> = ({ movies }) => {
  return (
    <ul className={classes["movies-list"]}>
      {movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
};

export default MoviesList;
