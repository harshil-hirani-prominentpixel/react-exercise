import { useState } from "react";
import ExpenseList from "./components/Expenses/ExpensesList";
import NewExpense from "./components/NewExpense/NewExpense";
import type { IExpense } from "./types/expense.type";

import initData from "./Data/Data";

export default function App() {
  const [expenses, setExpenses] = useState(initData);

  const addExpense = (expense: IExpense) => {
    setExpenses((prev: IExpense[]) => {
      return [...prev, expense];
    });
  };

  return (
    <>
      <NewExpense onAddExpense={addExpense} />
      <ExpenseList items={expenses} />
    </>
  );
}
