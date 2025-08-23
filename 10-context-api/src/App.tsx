import React from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";

const App: React.FC = () => {
  return (
    <CartProvider>
      <div style={{ padding: "20px" }}>
        <h1>🛒 Shopping Cart</h1>
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  );
};

export default App;
