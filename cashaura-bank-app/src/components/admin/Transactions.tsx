import { useEffect, useState } from "react";
import type { ITransactions } from "../../types/user";
import { getUsers } from "../../services/userService";

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<ITransactions[]>([]);

  useEffect(() => {
    const allUsers = getUsers();
    const allTransactions = allUsers.flatMap((u) => u.transactions);
    setTransactions(allTransactions);
  }, []);

  return (
    <div className='max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow'>
      <h2 className='text-2xl font-bold mb-4'>All Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions available.</p>
      ) : (
        <table className='w-full border'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='p-2 border'>From</th>
              <th className='p-2 border'>To</th>
              <th className='p-2 border'>Amount</th>
              <th className='p-2 border'>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td className='p-2 border'>{tx.from}</td>
                <td className='p-2 border'>{tx.to}</td>
                <td className='p-2 border'>${tx.amount}</td>
                <td className='p-2 border'>
                  {new Date(tx.date).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Transactions;
