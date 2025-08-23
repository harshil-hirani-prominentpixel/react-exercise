import React from "react";
import classes from "./MealItemForm.module.css";

type MealItemProps = {
  id: string;
  name: string;
  description: string;
  price: number;
};

const MealItem: React.FC<MealItemProps> = (props) => {
  const price = `₹${props.price.toFixed(2)}`;

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div></div>
    </li>
  );
};

export default MealItem;
