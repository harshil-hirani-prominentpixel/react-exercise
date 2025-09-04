import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { User } from "../types";
import { registerUser } from "../utils/auth";
import {
  validateEmailProminent,
  validatePassword,
  validateConfirmPassword,
} from "../utils/validator";

export default function Signup(): React.JSX.Element {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function validateAll(): boolean {
    const next: Record<string, string> = {};
    if (!form.firstName.trim()) next.firstName = "First name is required";
    if (!form.lastName.trim()) next.lastName = "Last name is required";

    const emailErr = validateEmailProminent(form.email);
    if (emailErr) next.email = emailErr;

    if (!form.username.trim()) next.username = "Username is required";

    const pwErr = validatePassword(form.password);
    if (pwErr) next.password = pwErr;

    const confErr = validateConfirmPassword(form.password, form.confirm);
    if (confErr) next.confirm = confErr;

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateAll()) return;

    const newUser: User = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      username: form.username.trim(),
      password: form.password,
    };

    const res = registerUser(newUser);
    if (!res.ok) {
      setErrors({ general: res.error });
      return;
    }
    navigate("/");
  }

  return (
    <div className='auth-container'>
      <form
        className='card auth-card shadow-sm'
        onSubmit={handleSubmit}
        noValidate
      >
        <div className='card-body'>
          <h2 className='mb-1'>Sign Up</h2>
          <p className='text-muted mb-4'>
            Create an account to get started with MyBlog.
          </p>

          <div className='row g-3'>
            <div className='col-md-6'>
              <label className='form-label'>First Name</label>
              <input
                name='firstName'
                value={form.firstName}
                onChange={handleChange}
                className={`form-control ${
                  errors.firstName ? "is-invalid" : ""
                }`}
                placeholder='Enter First Name'
              />
              {errors.firstName && (
                <div className='invalid-feedback d-block'>
                  {errors.firstName}
                </div>
              )}
            </div>

            <div className='col-md-6'>
              <label className='form-label'>Last Name</label>
              <input
                name='lastName'
                value={form.lastName}
                onChange={handleChange}
                className={`form-control ${
                  errors.lastName ? "is-invalid" : ""
                }`}
                placeholder='Enter Last Name'
              />
              {errors.lastName && (
                <div className='invalid-feedback d-block'>
                  {errors.lastName}
                </div>
              )}
            </div>

            <div className='col-12'>
              <label className='form-label'>Email</label>
              <input
                name='email'
                value={form.email}
                onChange={handleChange}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder='Enter Email'
              />
              {errors.email && (
                <div className='invalid-feedback d-block'>{errors.email}</div>
              )}
            </div>

            <div className='col-12'>
              <label className='form-label'>Username</label>
              <input
                name='username'
                value={form.username}
                onChange={handleChange}
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
                placeholder='Enter Username'
              />
              {errors.username && (
                <div className='invalid-feedback d-block'>
                  {errors.username}
                </div>
              )}
            </div>

            <div className='col-md-6'>
              <label className='form-label'>Password</label>
              <input
                type='password'
                name='password'
                value={form.password}
                onChange={handleChange}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder='Enter Password'
              />
              {errors.password && (
                <div className='invalid-feedback d-block'>
                  {errors.password}
                </div>
              )}
            </div>

            <div className='col-md-6'>
              <label className='form-label'>Confirm Password</label>
              <input
                type='password'
                name='confirm'
                value={form.confirm}
                onChange={handleChange}
                className={`form-control ${errors.confirm ? "is-invalid" : ""}`}
                placeholder='Enter Confirm Password'
              />
              {errors.confirm && (
                <div className='invalid-feedback d-block'>{errors.confirm}</div>
              )}
            </div>
          </div>

          {errors.general && <p className='err mt-2'>{errors.general}</p>}

          <button className='btn btn-primary w-100 mt-3' type='submit'>
            Sign Up
          </button>

          <p className='text-center mt-3 mb-0'>
            Already have an account? <Link to='/login'>Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
