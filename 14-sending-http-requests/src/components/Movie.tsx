import React from "react";
import classes from "./Movie.module.css";

type MovieProps = {
  title: string;
  releaseDate: string;
  openingText: string;
};

const Movie: React.FC<MovieProps> = ({ title, releaseDate, openingText }) => {
  return (
    <li className={classes.movie}>
      <h2>{title}</h2>
      <h3>{releaseDate}</h3>
      <p>{openingText}</p>
    </li>
  );
};

export default Movie;
