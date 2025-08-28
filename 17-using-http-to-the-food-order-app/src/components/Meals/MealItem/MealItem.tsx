import React, { useContext } from "react";

import MealItemForm from "./MealItemForm";
import classes from "./MealItemForm.module.css";
import CartContext from "../../../store/cart-context";

type CartItem = {
  id: string;
  name: string;
  amount: number;
  price: number;
};

type CartContextType = {
  items: CartItem[];
  totalAmount: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
};

type MealItemProps = {
  id: string;
  name: string;
  description: string;
  price: number;
};

const MealItem: React.FC<MealItemProps> = (props) => {
  const cartCtx = useContext(CartContext) as CartContextType;

  const price = `₹${props.price.toFixed(2)}`;

  const addToCartHandler = (amount: number) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
