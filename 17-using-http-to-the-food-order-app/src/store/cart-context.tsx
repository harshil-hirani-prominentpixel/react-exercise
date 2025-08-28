import React from "react";

export type CartItem = {
  id: string;
  name: string;
  amount: number;
  price: number;
};

export type CartContextType = {
  items: CartItem[];
  totalAmount: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void; 
};

const CartContext = React.createContext<CartContextType>({
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {}, 
});

export default CartContext;
