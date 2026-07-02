import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { registerUser } from '../slices/authSlice';

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.auth.users);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const submit = (event) => {
    event.preventDefault();
    if (form.password.length < 6) return setError('Password must be at least 6 characters.');
    if (form.password !== form.confirmPassword) return setError('Passwords do not match.');
    if (users.some((item) => item.email === form.email.trim().toLowerCase())) return setError('An account with this email already exists.');

    dispatch(registerUser({ name: form.name.trim(), email: form.email.trim().toLowerCase(), password: form.password, createdAt: new Date().toISOString() }));
    toast.success('Account created');
    navigate('/login');
  };

  return (
    <section className="auth-shell container">
      <div className="auth-copy">
        <h1>Create account</h1>
        <p>Join Velora for saved carts, wishlists, and profile editing.</p>
      </div>
      <form className="auth-card" onSubmit={submit}>
        <label>Full name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} type="text" required /></label>
        <label>Email<input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" required /></label>
        <label>Password<input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" required /></label>
        <label>Confirm password<input value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} type="password" required /></label>
        {error && <div className="form-alert">{error}</div>}
        <button className="primary-btn" type="submit">Create account</button>
        <p className="auth-link">Already have an account? <Link to="/login">Sign in</Link></p>
      </form>
    </section>
  );
}