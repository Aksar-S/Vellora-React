import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateCurrentUser } from '../slices/authSlice';
import { saveProfile } from '../slices/profileSlice';
import { toast } from 'react-toastify';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const savedProfile = useAppSelector((state) => state.profile.items[currentUser?.email || ''] || {});
  const [form, setForm] = useState({ name: currentUser?.name || '', email: currentUser?.email || '', phone: savedProfile.phone || '', address: savedProfile.address || '', city: savedProfile.city || '', state: savedProfile.state || '' });

  if (!currentUser) {
    return <section className="auth-card simple-page"><h1>Profile</h1><p>Please sign in to edit your profile.</p></section>;
  }

  const submit = (event) => {
    event.preventDefault();
    dispatch(updateCurrentUser({ name: form.name, email: form.email }));
    dispatch(saveProfile({ email: form.email, profile: form }));
    toast.success('Profile updated');
  };

  return (
    <section className="simple-page">
      <h1>User profile</h1>
      <form className="auth-card profile-form" onSubmit={submit}>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" required />
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" type="email" required />
        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" />
        <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Address" />
        <div className="grid-2">
          <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" />
          <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} placeholder="State" />
        </div>
        <button className="primary-btn" type="submit">Save profile</button>
      </form>
    </section>
  );
}