import React from "react";
import Item from "./components/Item";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <div className='app'>
        <h1>React Context API with TypeScript</h1>
        <div className='products'>
          <Item id={1} name='MacBook Pro' price={100000} />
          <Item id={2} name='Pendrive' price={4000} />
          <Item id={3} name='Mobile' price={35000} />
        </div>
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;
