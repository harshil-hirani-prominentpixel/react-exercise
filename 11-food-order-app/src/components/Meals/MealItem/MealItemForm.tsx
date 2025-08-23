import React, { useRef } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

type MealItemFormProps = {
  onAddToCart: (amount: number) => void;
};

const MealItemForm: React.FC<MealItemFormProps> = (props) => {
  const amountInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current?.value;
    const enteredAmountNumber = +enteredAmount!;

    if (
      enteredAmount?.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
