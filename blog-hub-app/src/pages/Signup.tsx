import { useState, type JSX } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { User } from "../types";
import { registerUser } from "../utils/auth";
import {
  validateEmailProminent,
  validatePassword,
  validateConfirmPassword,
} from "../utils/validator";

export default function Signup(): JSX.Element {
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
      <form className='auth-card' onSubmit={handleSubmit} noValidate>
        <h2>Sign Up</h2>
        <p className='subtitle'>
          Create an account to get started with MyBlog.
        </p>

        <div className='grid-2'>
          <div className='form-group'>
            <label>First Name</label>
            <input
              name='firstName'
              value={form.firstName}
              onChange={handleChange}
              placeholder='Enter First Name'
            />
            {errors.firstName && (
              <small className='err'>{errors.firstName}</small>
            )}
          </div>

          <div className='form-group'>
            <label>Last Name</label>
            <input
              name='lastName'
              value={form.lastName}
              onChange={handleChange}
              placeholder='Enter Last Name'
            />
            {errors.lastName && (
              <small className='err'>{errors.lastName}</small>
            )}
          </div>
        </div>

        <div className='form-group'>
          <label>Email</label>
          <input
            name='email'
            value={form.email}
            onChange={handleChange}
            placeholder='Enter Email'
          />
          {errors.email && <small className='err'>{errors.email}</small>}
        </div>

        <div className='form-group'>
          <label>Username</label>
          <input
            name='username'
            value={form.username}
            onChange={handleChange}
            placeholder='Enter Username'
          />
          {errors.username && <small className='err'>{errors.username}</small>}
        </div>

        <div className='grid-2'>
          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              value={form.password}
              onChange={handleChange}
              placeholder='Enter Password'
            />
            {errors.password && (
              <small className='err'>{errors.password}</small>
            )}
          </div>

          <div className='form-group'>
            <label>Confirm Password</label>
            <input
              type='password'
              name='confirm'
              value={form.confirm}
              onChange={handleChange}
              placeholder='Enter Confirm Password'
            />
            {errors.confirm && <small className='err'>{errors.confirm}</small>}
          </div>
        </div>

        {errors.general && <p className='err'>{errors.general}</p>}

        <button className='btn-cta' type='submit'>
          Sign Up
        </button>

        <p className='switch-auth'>
          Already have an account? <Link to='/login'>Login</Link>
        </p>
      </form>
    </div>
  );
}
