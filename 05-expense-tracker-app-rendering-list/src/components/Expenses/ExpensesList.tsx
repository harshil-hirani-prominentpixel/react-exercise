import type React from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpenseList.css";
import type { IExpense } from "../../types/expense.type";
import { useState } from "react";
import FilterExpense from "./FilterExpenses";
import Chart from "../Chart/Chart";

const Expenses: React.FC<{ items: IExpense[] }> = ({ items }) => {
  const [filteredYear, setFilteredYear] = useState("2020");

  const filterChangeHandler = (selectedYear: string) => {
    setFilteredYear(selectedYear);
  };

  const years = items.reduce((arr: number[], curr) => {
    const year = curr.date.getFullYear();
    if (!arr.includes(year)) {
      arr.push(year);
    }
    return arr;
  }, [] as number[]);

  const FilterExpenses = items.filter(
    (expense) => expense.date.getFullYear() === +filteredYear
  );

  return (
    <div className="expenses">
      <FilterExpense
        yearList={years}
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />

      <Chart expenses={FilterExpenses} />

      {FilterExpenses.map((expense) => {
        return (
          <ExpenseItem
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
            key={expense.id}
          ></ExpenseItem>
        );
      })}
    </div>
  );
};

export default Expenses;
