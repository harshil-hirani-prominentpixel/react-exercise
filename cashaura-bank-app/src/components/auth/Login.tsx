import React from "react";
import { useBank } from "../../context/BankContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const { loginUser, currentUser } = useBank();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: typeof initialValues) => {
    const success = loginUser(values.email, values.password);

    if (success && currentUser) {
      if (currentUser.role === "admin") {
        navigate("/admin"); 
      } else {
        navigate("/dashboard"); 
      }
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded shadow'>
      <h2 className='text-2xl font-bold mb-4'>Login</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='space-y-3'>
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
              disabled={isSubmitting}
              className='w-full py-2 rounded bg-green-600 text-white disabled:opacity-50'
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
