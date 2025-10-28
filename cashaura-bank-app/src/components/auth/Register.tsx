import React from "react";
import { useBank } from "../../context/BankContext";
import type { IUser } from "../../types/user";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getRegisterValidationSchema } from "../../utils/validators";

const Register: React.FC = (): React.JSX.Element => {
  const { users, addUserByAdmin } = useBank();

  const initialValues: {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    password: string;
    role: "user" | "admin";
  } = {
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    role: "user",
  };

  const handleSubmit = (
    values: {
      firstName: string;
      lastName: string;
      email: string;
      mobileNumber: string;
      password: string;
      role: "user" | "admin";
    },
    { resetForm }: { resetForm: () => void }
  ) => {
    const newUser: IUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      mobileNumber: Number(values.mobileNumber),
      password: values.password,
      role: values.role,
      accountNumber: Math.floor(Math.random() * 1e15),
      balance: 0,
      transactions: [],
    };

    addUserByAdmin(newUser);
    alert("User registered successfully");
    resetForm();
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded shadow'>
      <h2 className='text-2xl font-bold mb-4'>Register</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={getRegisterValidationSchema(users)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='space-y-3'>
            <div>
              <Field
                name='firstName'
                placeholder='First Name'
                className='w-full p-2 border rounded'
              />
              <ErrorMessage
                name='firstName'
                component='div'
                className='text-red-500 text-sm'
              />
            </div>

            <div>
              <Field
                name='lastName'
                placeholder='Last Name'
                className='w-full p-2 border rounded'
              />
              <ErrorMessage
                name='lastName'
                component='div'
                className='text-red-500 text-sm'
              />
            </div>

            <div>
              <Field
                name='email'
                type='email'
                placeholder='Email'
                className='w-full p-2 border rounded'
              />
              <ErrorMessage
                name='email'
                component='div'
                className='text-red-500 text-sm'
              />
            </div>

            <div>
              <Field
                name='mobileNumber'
                type='tel'
                placeholder='Mobile Number'
                className='w-full p-2 border rounded'
              />
              <ErrorMessage
                name='mobileNumber'
                component='div'
                className='text-red-500 text-sm'
              />
            </div>

            <div>
              <Field
                name='password'
                type='password'
                placeholder='Password'
                className='w-full p-2 border rounded'
              />
              <ErrorMessage
                name='password'
                component='div'
                className='text-red-500 text-sm'
              />
            </div>

            <button
              type='submit'
              className='w-full py-2 rounded bg-green-600 text-white disabled:opacity-50'
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
