import React, { type ChangeEvent } from "react";
import "./FilterExpenses.css";

const ExpensesFilter: React.FC<{
  yearList: number[];
  selected: string;
  onChangeFilter: (selectedYear: string) => void;
}> = (props) => {
  const dropdownChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter by year</label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
          {props.yearList.map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
