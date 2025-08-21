import React from "react";
import { useCart } from "../context/CartContext";

type ItemProps = {
  id: number;
  name: string;
  price: number;
};

const Item: React.FC<ItemProps> = ({ id, name, price }) => {
  const { addToCart } = useCart();

  return (
    <div className='item'>
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      <button onClick={() => addToCart({ id, name, price })}>
        Add To Cart
      </button>
    </div>
  );
};

export default Item;
