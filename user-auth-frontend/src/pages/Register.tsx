import React, { useState } from "react";
import { registerUser } from "../api/user.api";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      setMessage("User registered successfully!");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err: unknown) {
      if (err instanceof Error) setMessage(` ${err.message}`);
      else setMessage("Registration failed.");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md bg-white p-8 rounded-xl shadow-lg border'>
        <h2 className='text-3xl font-bold text-center mb-6 text-gray-800'>
          Register
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            className='w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-green-500 outline-none'
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className='w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-green-500 outline-none'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className='w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-green-500 outline-none'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type='submit'
            className='w-full bg-green-400 hover:bg-green-400 text-white py-3 rounded-md font-semibold transition duration-200'
          >
            Register
          </button>
        </form>
        {message && <p className='mt-4 text-center text-gray-700'>{message}</p>}
      </div>
    </div>
  );
};

export default Register;