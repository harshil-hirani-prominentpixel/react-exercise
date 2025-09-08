import { useEffect, useState } from "react";
import type { IUser } from "../../types/user";
import { getUsers, deleteUser } from "../../services/userService";

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const fetchUsers = () => {
    setUsers(getUsers());
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (email: string) => {
    if (window.confirm("Are you sure to delete this user?")) {
      deleteUser(email);
      fetchUsers();
    }
  };

  return (
    <div className='max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow'>
      <h2 className='text-2xl font-bold mb-4'>Users List</h2>
      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <table className='w-full border'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='p-2 border'>Name</th>
              <th className='p-2 border'>Email</th>
              <th className='p-2 border'>Role</th>
              <th className='p-2 border'>Account</th>
              <th className='p-2 border'>Balance</th>
              <th className='p-2 border'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.accountNumber}>
                <td className='p-2 border'>
                  {u.firstName} {u.lastName}
                </td>
                <td className='p-2 border'>{u.email}</td>
                <td className='p-2 border'>{u.role}</td>
                <td className='p-2 border'>{u.accountNumber}</td>
                <td className='p-2 border'>₹{u.balance.toFixed(2)}</td>
                <td className='p-2 border'>
                  <button
                    className='bg-red-600 text-white px-2 py-1 rounded'
                    onClick={() => handleDelete(u.email)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersList;
