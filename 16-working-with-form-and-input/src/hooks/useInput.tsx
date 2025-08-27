import { useState } from "react";

type ValidatorFn = (value: string) => boolean;

export function useInput(initialValue: string, validate: ValidatorFn) {
  const [enteredValue, setEnteredValue] = useState<string>(initialValue);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const valueIsValid = validate(enteredValue);
  const hasError = !valueIsValid && isTouched;

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEnteredValue(event.target.value);
  }

  function handleInputBlur() {
    setIsTouched(true);
  }

  function reset() {
    setEnteredValue(initialValue);
    setIsTouched(false);
  }

  return {
    value: enteredValue,
    hasError,
    handleInputChange,
    handleInputBlur,
    reset,
  };
}
