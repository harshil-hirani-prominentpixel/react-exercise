import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Users from "./pages/Users";

const App: React.FC = () => {
  return (
    <Router>
      <nav className='bg-green-400 p-4 flex gap-4 justify-center'>
        <Link to='/'>Register</Link>
        <Link to='/login'>Login</Link>
        <Link to='/users'>Users</Link>
      </nav>

      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </Router>
  );
};

export default App;
