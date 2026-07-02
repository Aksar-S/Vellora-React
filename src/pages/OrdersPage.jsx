import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../utils/storage';

export default function OrdersPage() {
  const items = useSelector((state) => state.orders.items);

  return (
    <section className="simple-page">
      <h1>My orders</h1>
      {items.length === 0 ? <p>No orders yet. <Link to="/products">Start shopping</Link></p> : items.map((order) => (
        <article key={order.id} className="order-card">
          <h3>{order.id}</h3>
          <p>{new Date(order.date).toLocaleString()}</p>
          <p>Status: {order.status}</p>
          <p>{order.items.length} items</p>
          <strong>{formatCurrency(order.total)}</strong>
        </article>
      ))}
    </section>
  );
}