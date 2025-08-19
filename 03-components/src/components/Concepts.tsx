import React from "react";

import type { concept } from "../types/concept.type";

const Concepts: React.FC<{ concepts: concept[] }> = ({ concepts }) => {
  return (
    <ul id="concepts">
      {concepts.map((data) => {
        return (
          <li key={Math.random()} className="concept">
            <img src={data.image} alt={data.title} />
            <h2>{data.title}</h2>
            <p>{data.description}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Concepts;
