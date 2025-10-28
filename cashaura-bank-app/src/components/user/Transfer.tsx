import React from "react";
import { useBank } from "../../context/BankContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const transferValidationSchema = Yup.object().shape({
  toAcc: Yup.number()
    .typeError("Account number must be a number")
    .positive("Account number must be greater than 0")
    .required("Account number is required"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than 0")
    .required("Amount is required"),
});

const Transfer: React.FC = (): React.JSX.Element => {
  const { transferMoney } = useBank();

  const initialValues = {
    toAcc: "",
    amount: "",
  };

  const handleSubmit = (values: typeof initialValues) => {
    try {
      transferMoney(Number(values.toAcc), Number(values.amount));
      alert("Transfer successful!");
    } catch (err) {
      if (err instanceof Error) alert(err.message);
      else alert("Unknown error occurred");
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded shadow'>
      <h2 className='text-2xl font-bold mb-4'>Transfer Money</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={transferValidationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className='space-y-3'>
            <div>
              <Field
                name='toAcc'
                type='number'
                placeholder='To Account'
                className='w-full p-2 border rounded'
              />
              <ErrorMessage
                name='toAcc'
                component='div'
                className='text-red-500 text-sm'
              />
            </div>

            <div>
              <Field
                name='amount'
                type='number'
                placeholder='Amount'
                className='w-full p-2 border rounded'
              />
              <ErrorMessage
                name='amount'
                component='div'
                className='text-red-500 text-sm'
              />
            </div>

            <button
              type='submit'
              className='w-full py-2 rounded bg-green-600 text-white disabled:opacity-50'
            >
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Transfer;
