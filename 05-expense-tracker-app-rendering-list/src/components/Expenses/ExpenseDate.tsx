import React from "react";
import "./ExpenseDate.css";

const ExpenseDate: React.FC<{ date: Date }> = ({ date }) => {
  return (
    <div className="expense-date">
      <div className="expense-date__month">
        {date.toLocaleDateString("en-US", { month: "long" })}
      </div>
      <div className="expense-date__day">
        {date.toLocaleDateString("en-US", { day: "2-digit" })}
      </div>
      <div className="expense-date__year"> {date.getFullYear()}</div>
    </div>
  );
};

export default ExpenseDate;
