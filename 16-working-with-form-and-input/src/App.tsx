import React from "react";
import Header from "./components/Header";
import Login from "./components/StateLogin";


const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Login />
      </main>
    </>
  );
};

export default App;
