import React, { useState, type ChangeEvent, type FormEvent } from "react";
import "./ExpenseForm.css";
import type { IExpense } from "../../types/expense.type";

interface ISaveData {
  onSaveData: (expense: Omit<IExpense, "id">) => void;
}

const ExpenseForm: React.FC<ISaveData> = ({ onSaveData }) => {
  const [data, setData] = useState({ title: "", amount: "", date: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const expense: Omit<IExpense, "id"> = {
      ...data,
      amount: +data.amount,
      date: new Date(data.date),
    };
    onSaveData(expense);
    setData({ title: "", amount: "", date: "" });
  };

  const changeHandler = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    setData((prev) => {
      return { ...prev, [input.name]: input.value };
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="new-expense__controls">
        <div className="new-expense__controls">
          <label>Title</label>
          <input
            type="text"
            onChange={changeHandler}
            name="title"
            value={data.title}
          />
        </div>
        <div className="new-expense__controls">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={data.amount}
            name="amount"
            onChange={changeHandler}
          />
        </div>
        <div className="new-expense__controls">
          <label>Date</label>
          <input
            type="date"
            name="date"
            onChange={changeHandler}
            value={data.date}
          />
        </div>
        <div className="new-expense__controls">
          <button type="submit">Create</button>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
