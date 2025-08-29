import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store/store";
import { increment, decrement, incrementByAmount } from "./counterSlice";
import { useState } from "react";

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();
  const [amount, setAmount] = useState<number>(0);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Redux Toolkit Counter</h1>
      <h2>{count}</h2>

      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>

      <div style={{ marginTop: "1rem" }}>
        <input
          type='number'
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button onClick={() => dispatch(incrementByAmount(amount))}>
          Add Amount
        </button>
      </div>
    </div>
  );
}
