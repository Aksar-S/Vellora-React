import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderSuccessPage() {
  return (
    <section className="auth-card simple-page">
      <p className="eyebrow">Order placed</p>
      <h1>Thanks for shopping with Velora</h1>
      <p>Your order has been saved locally and added to your history.</p>
      <div className="hero-actions">
        <Link className="primary-btn" to="/orders">View orders</Link>
        <Link className="secondary-btn" to="/products">Continue shopping</Link>
      </div>
    </section>
  );
}