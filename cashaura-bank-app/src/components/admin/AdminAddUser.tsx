import React, { useState } from "react";
import { useBank } from "../../context/BankContext";
import type { IUser } from "../../types/user";

type Role = "user" | "admin";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNumber: string;
  role: Role;
}

const AdminAddUser: React.FC = () => {
  const { addUserByAdmin } = useBank();

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
    role: "user",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.firstName || !form.email) {
      alert("Fill required fields");
      return;
    }

    const user: IUser = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      mobileNumber: Number(form.mobileNumber),
      accountNumber: Math.floor(Math.random() * 1e15),
      balance: 0,
      transactions: [],
      role: form.role,
    };

    addUserByAdmin(user);
    alert("User added successfully");

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      mobileNumber: "",
      role: "user",
    });
  };

  return (
    <div className='max-w-md mx-auto bg-white p-6 rounded shadow'>
      <h2 className='text-2xl font-semibold mb-4'>Add User (Admin)</h2>
      <form className='space-y-3' onSubmit={onSubmit}>
        <input
          name='firstName'
          value={form.firstName}
          onChange={onChange}
          placeholder='First Name'
          className='w-full p-2 border rounded'
          required
        />
        <input
          name='lastName'
          value={form.lastName}
          onChange={onChange}
          placeholder='Last Name'
          className='w-full p-2 border rounded'
        />
        <input
          name='email'
          value={form.email}
          onChange={onChange}
          placeholder='Email'
          className='w-full p-2 border rounded'
          type='email'
          required
        />
        <input
          name='mobileNumber'
          value={form.mobileNumber}
          onChange={onChange}
          placeholder='Mobile Number'
          className='w-full p-2 border rounded'
        />
        <input
          name='password'
          type='password'
          value={form.password}
          onChange={onChange}
          placeholder='Password'
          className='w-full p-2 border rounded'
        />
        <select
          name='role'
          value={form.role}
          onChange={onChange}
          className='w-full p-2 border rounded'
        >
          <option value='user'>User</option>
          <option value='admin'>Admin</option>
        </select>
        <button className='w-full py-2 rounded bg-[#11AD58] text-white'>
          Add User
        </button>
      </form>
    </div>
  );
};

export default AdminAddUser;
