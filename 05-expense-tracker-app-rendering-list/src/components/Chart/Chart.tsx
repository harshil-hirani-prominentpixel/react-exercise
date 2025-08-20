import React from "react";
import type { IExpense } from "../../types/expense.type";
import "./Chart.css";

interface Props {
  expenses: IExpense[];
}

const Chart: React.FC<Props> = ({ expenses }) => {
  const monthlyData = Array.from({ length: 12 }, (_, month) => {
    const total = expenses
      .filter((e) => e.date.getMonth() === month)
      .reduce((sum, e) => sum + e.amount, 0);

    return {
      label: new Date(0, month).toLocaleString("default", { month: "short" }),
      value: total,
    };
  });

  const maxValue = Math.max(...monthlyData.map((m) => m.value), 1);

  return (
    <div className="chart">
      {monthlyData.map((data) => (
        <div key={data.label} className="chart-bar">
          <div className="chart-bar__inner">
            <div
              className="chart-bar__fill"
              style={{ height: `${(data.value / maxValue) * 100}%` }}
              title={`$${data.value.toFixed(2)}`}
            ></div>
          </div>
          <div className="chart-bar__label">{data.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Chart;
