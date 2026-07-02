import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { FaLock, FaShieldHalved } from 'react-icons/fa6';
import { authenticateAdmin, adminLoginCopy, isAdminAuthenticated } from '../../admin/adminAuth';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  if (isAdminAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }

  const submit = (event) => {
    event.preventDefault();

    if (!authenticateAdmin(form.username, form.password)) {
      setError('Invalid admin credentials.');
      return;
    }

    navigate('/admin');
  };

  return (
    <section className="admin-login-shell container page-enter">
      <div className="admin-login-copy soft-card">
        <div className="admin-login-badge">
          <FaShieldHalved />
          <span>Restricted area</span>
        </div>
        <h1>{adminLoginCopy.title}</h1>
        <p>{adminLoginCopy.subtitle}</p>
        <div className="admin-login-note">
          <FaLock />
          <span>{adminLoginCopy.note}</span>
        </div>
      </div>

      <form className="admin-login-form soft-card" onSubmit={submit}>
        <div>
          <p className="eyebrow">Sign in</p>
          <h2>Admin credentials</h2>
        </div>

        <label className="admin-field">
          <span>Username</span>
          <input
            value={form.username}
            onChange={(event) => setForm({ ...form, username: event.target.value })}
            type="text"
            autoComplete="username"
            required
          />
        </label>

        <label className="admin-field">
          <span>Password</span>
          <input
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            type="password"
            autoComplete="current-password"
            required
          />
        </label>

        {error ? <div className="form-alert">{error}</div> : null}

        <button className="primary-btn" type="submit">Enter admin panel</button>
      </form>
    </section>
  );
}