import React from "react";
import ExpenseDate from "./ExpenseDate";
import "./ExpenseItem.css";

interface Props {
  title: string;
  amount: number;
  date: Date;
}

const ExpenseItem: React.FC<Props> = ({ amount, title, date }) => {
  return (
    <div className="expense-item">
      <ExpenseDate date={date} />
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">{amount}</div>
      </div>
    </div>
  );
};

export default ExpenseItem;
