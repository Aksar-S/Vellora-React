import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loginUser } from '../slices/authSlice';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.auth.users);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const submit = (event) => {
    event.preventDefault();
    const user = users.find((item) => item.email === form.email.trim().toLowerCase());
    if (!user) {
      setError('User not found. Please register first.');
      return;
    }
    if (user.password !== form.password) {
      setError('Incorrect password. Please try again.');
      return;
    }
    dispatch(loginUser({ name: user.name, email: user.email }));
    toast.success('Signed in successfully');
    navigate('/');
  };

  return (
    <section className="auth-shell container">
      <div className="auth-copy">
        <h1>Sign in</h1>
        <p>Access saved carts, wishlists, and order history.</p>
      </div>
      <form className="auth-card" onSubmit={submit}>
        <label>Email<input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" required /></label>
        <label>Password<input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" required /></label>
        {error && <div className="form-alert">{error}</div>}
        <button className="primary-btn" type="submit">Sign in</button>
        <p className="auth-link">Need an account? <Link to="/register">Register here</Link></p>
      </form>
    </section>
  );
}