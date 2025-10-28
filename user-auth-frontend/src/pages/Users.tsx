import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api/user.api";
import { type IUser } from "../types/user.type";

const Users: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data || []); 
      } catch (err: unknown) {
        if (err instanceof Error) setMessage(err.message);
        else setMessage("Failed to fetch users.");
      }
    };
    fetchUsers();
  }, []);

  console.log(users)

  return (
    <div className='min-h-screen p-6 bg-gray-50'>
      <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>
        All Users
      </h2>

      {message && <p className='text-center text-red-500 mb-4'>{message}</p>}

      <div className='overflow-x-auto'>
        <table className='w-full border-collapse border rounded-lg shadow-sm bg-white'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='border p-3 text-left'>ID</th>
              <th className='border p-3 text-left'>Name</th>
              <th className='border p-3 text-left'>Email</th>
              <th className='border p-3 text-left'>Active</th>
              <th className='border p-3 text-left'>Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email} className='hover:bg-gray-50'>
                <td className='border p-3'>{user.id}</td>
                <td className='border p-3'>{user.name}</td>
                <td className='border p-3'>{user.email}</td>
                <td className='border p-3'>{user.isActive ? "Yes" : "No"}</td>
                <td className='border p-3'>{user.isAdmin ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;