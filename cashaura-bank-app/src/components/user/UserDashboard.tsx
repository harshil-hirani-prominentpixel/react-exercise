import React from "react";
import { useBank } from "../../context/BankContext";

const UserDashboard: React.FC = (): React.JSX.Element => {
  const { currentUser } = useBank();

  if (!currentUser) {
    return (
      <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded shadow'>
        <h2 className='text-2xl font-bold mb-4'>Dashboard</h2>
        <p>No user logged in.</p>
      </div>
    );
  }

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded shadow'>
      <h2 className='text-2xl font-bold mb-4'>Dashboard</h2>
      <div className='space-y-2'>
        <p>
          Name: {currentUser.firstName} {currentUser.lastName}
        </p>
        <p>Email: {currentUser.email}</p>
        <p>Account Number: {currentUser.accountNumber}</p>
        <p>Balance: ₹{currentUser.balance.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default UserDashboard;
