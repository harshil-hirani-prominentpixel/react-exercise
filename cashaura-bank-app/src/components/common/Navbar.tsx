import { Link } from "react-router-dom";
import { useBank } from "../../context/BankContext";

const Navbar: React.FC = () => {
  const { currentUser, logoutUser } = useBank();

  return (
    <div className='bg-black text-white px-4 py-3 flex justify-between'>
      <div className='flex gap-4 items-center'>
        <Link to='/' className='font-bold'>
          CashAura
        </Link>
        {currentUser?.role === "user" && (
          <>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/transfer'>Transfer</Link>
            <Link to='/history'>History</Link>
          </>
        )}
        {currentUser?.role === "admin" && (
          <>
            <Link to='/admin'>Admin</Link>
            <Link to='/admin/add-user'>Add User</Link>
            <Link to='/admin/users'>Users</Link>
            <Link to='/admin/transactions'>Transactions</Link>
          </>
        )}
      </div>
      <div>
        {currentUser ? (
          <button
            onClick={logoutUser}
            className='bg-green-600 px-3 py-1 rounded'
          >
            Logout
          </button>
        ) : (
          <>
            <Link to='/login' className='px-3'>
              Login
            </Link>
            <Link to='/register' className='px-3'>
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
