// import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Context
import { BankProvider } from "./context/BankContext";

import Navbar from "./components/common/Navbar";
// Auth
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
// User
import UserDashboard from "./components/user/UserDashboard";
import Transfer from "./components/user/Transfer";
import UserHistory from "./components/user/UserHistory";
// Admin
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminAddUser from "./components/admin/AdminAddUser";
import UsersList from "./components/admin/UsersList";
import Transactions from "./components/admin/Transactions";

function App() {
  return (
    <BankProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to='/login' replace />} />

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/dashboard' element={<UserDashboard />} />
          <Route path='/transfer' element={<Transfer />} />
          <Route path='/history' element={<UserHistory />} />

          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/admin/add-user' element={<AdminAddUser />} />
          <Route path='/admin/users' element={<UsersList />} />
          <Route path='/admin/transactions' element={<Transactions />} />
        </Routes>
      </BrowserRouter>
    </BankProvider>
  );
}

export default App;
