import "./NewExpense.css";
import React from "react";
import ExpenseForm from "./ExpenseForm";
import type { IExpense } from "../../types/expense.type";

interface IAddExpense {
  onAddExpense: (expense: IExpense) => void;
}

const NewExpense: React.FC<IAddExpense> = ({ onAddExpense }) => {
  const saveData = (expense: Omit<IExpense, "id">) => {
    const newExpense = {
      ...expense,
      id: Math.random().toString(),
    };
    onAddExpense(newExpense);
  };
  return (
    <div className="new-expense">
      <ExpenseForm onSaveData={saveData} />
    </div>
  );
};

export default NewExpense;
