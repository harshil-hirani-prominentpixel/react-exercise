import { useBank } from "../../context/BankContext";

const AdminDashboard: React.FC = () => {
  const { currentUser } = useBank();

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded shadow'>
      <h2 className='text-2xl font-bold mb-4'>Admin Dashboard</h2>
      {currentUser && (
        <div className='space-y-2'>
          <p>
            Name: {currentUser.firstName} {currentUser.lastName}
          </p>
          <p>Email: {currentUser.email}</p>
          <p>Role: {currentUser.role}</p>
          <p>Account Number: {currentUser.accountNumber}</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
