import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearCart } from '../slices/cartSlice';
import { placeOrder } from '../slices/ordersSlice';
import { saveProfile } from '../slices/profileSlice';
import { buildOrderId, formatCurrency } from '../utils/storage';
import { toast } from 'react-toastify';

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = useAppSelector((state) => state.cart.items);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const [form, setForm] = useState({ name: currentUser?.name || '', email: currentUser?.email || '', phone: '', address: '', city: '', state: '', pincode: '' });
  const total = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const submit = (event) => {
    event.preventDefault();
    const order = {
      id: buildOrderId(),
      date: new Date().toISOString(),
      items,
      total,
      shipping: { ...form },
      status: 'Processing'
    };
    dispatch(placeOrder(order));
    dispatch(saveProfile({ email: form.email, profile: form }));
    dispatch(clearCart());
    toast.success('Order placed successfully');
    navigate('/order-success');
  };

  if (items.length === 0) {
    return <section className="auth-card simple-page"><h1>Your bag is empty</h1><p><Link to="/products">Continue shopping</Link></p></section>;
  }

  return (
    <section className="two-column-page">
      <form className="auth-card checkout-form" onSubmit={submit}>
        <h1>Checkout</h1>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" required />
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" type="email" required />
        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" required />
        <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Address" required />
        <div className="grid-2">
          <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" required />
          <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} placeholder="State" required />
        </div>
        <input value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} placeholder="Pincode" required />
        <button className="primary-btn" type="submit">Place order</button>
      </form>
      <aside className="summary-card">
        <h2>Order summary</h2>
        {items.map((item) => <p key={item.id}>{item.name} x {item.quantity || 1}</p>)}
        <p>Total: {formatCurrency(total)}</p>
      </aside>
    </section>
  );
}