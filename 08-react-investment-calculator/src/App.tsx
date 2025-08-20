import React, { FormEvent, useState } from "react";
import logo from "./assets/investment-calculator-logo.png";

type UserInput = {
  "current-savings": number;
  "yearly-contribution": number;
  "expected-return": number;
  duration: number;
};

type YearlyData = {
  year: number;
  yearlyInterest: number;
  savingsEndOfYear: number;
  yearlyContribution: number;
};

function App() {
  const [results, setResults] = useState<YearlyData[]>([]);

  const calculateHandler = (userInput: UserInput) => {
    const yearlyData: YearlyData[] = []; // per-year results

    let currentSavings: number = userInput["current-savings"];
    const yearlyContribution: number = userInput["yearly-contribution"];
    const expectedReturn: number = userInput["expected-return"] / 100;
    const duration: number = userInput["duration"];

    for (let i: number = 0; i < duration; i++) {
      const yearlyInterest: number = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;

      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }

    setResults(yearlyData);
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const userInput: UserInput = {
      "current-savings": +formData.get("current-savings")!,
      "yearly-contribution": +formData.get("yearly-contribution")!,
      "expected-return": +formData.get("expected-return")!,
      duration: +formData.get("duration")!,
    };
    calculateHandler(userInput);
  };

  return (
    <div>
      <header className='header'>
        <img src={logo} alt='logo' />
        <h1>Investment Calculator</h1>
      </header>

      <form className='form' onSubmit={submitHandler}>
        <div className='input-group'>
          <p>
            <label htmlFor='current-savings'>Current Savings ($)</label>
            <input type='number' id='current-savings' name='current-savings' />
          </p>
          <p>
            <label htmlFor='yearly-contribution'>Yearly Savings ($)</label>
            <input
              type='number'
              id='yearly-contribution'
              name='yearly-contribution'
            />
          </p>
        </div>
        <div className='input-group'>
          <p>
            <label htmlFor='expected-return'>
              Expected Interest (%, per year)
            </label>
            <input type='number' id='expected-return' name='expected-return' />
          </p>
          <p>
            <label htmlFor='duration'>Investment Duration (years)</label>
            <input type='number' id='duration' name="duration" />
          </p>
        </div>
        <p className='actions'>
          <button type='reset' className='buttonAlt'>
            Reset
          </button>
          <button type='submit' className='button'>
            Calculate
          </button>
        </p>
      </form>

      {results.length > 0 ? (
        <table className='result'>
          <thead>
            <tr>
              <th>Year</th>
              <th>Total Savings</th>
              <th>Interest (Year)</th>
              <th>Total Interest</th>
              <th>Invested Capital</th>
            </tr>
          </thead>
          <tbody>
            {results.map((data) => {
              const investedCapital =
                data.yearlyContribution * data.year +
                results[0].savingsEndOfYear -
                results[0].yearlyInterest;

              const totalInterest = data.savingsEndOfYear - investedCapital;

              return (
                <tr key={data.year}>
                  <td>{data.year}</td>
                  <td>{data.savingsEndOfYear.toFixed(2)}</td>
                  <td>{data.yearlyInterest.toFixed(2)}</td>
                  <td>{totalInterest.toFixed(2)}</td>
                  <td>{investedCapital.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No investment calculating yet.</p>
      )}
    </div>
  );
}

export default App;
