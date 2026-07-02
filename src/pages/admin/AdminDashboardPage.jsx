import React from 'react';
import { useSelector } from 'react-redux';
import { catalog } from '../../data/catalog';
import { formatCurrency } from '../../utils/storage';

export default function AdminDashboardPage() {
  const orders = useSelector((state) => state.orders.items);
  const revenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  const recentOrders = orders.slice(0, 3);

  const stats = [
    { label: 'Products', value: catalog.length },
    { label: 'Orders', value: orders.length },
    { label: 'Revenue', value: formatCurrency(revenue) },
    { label: 'Categories', value: new Set(catalog.map((item) => item.category)).size }
  ];

  return (
    <section className="admin-content-grid">
      <header className="admin-page-header soft-card">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Store overview</h1>
        </div>
        <p className="admin-page-copy">Monitor catalog performance, order volume, and the latest activity from one place.</p>
      </header>

      <div className="admin-stats-grid">
        {stats.map((stat) => (
          <article key={stat.label} className="admin-stat-card soft-card">
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </div>

      <article className="soft-card admin-panel">
        <div className="admin-panel-header">
          <div>
            <p className="eyebrow">Recent orders</p>
            <h2>Latest activity</h2>
          </div>
        </div>

        {recentOrders.length > 0 ? (
          <div className="admin-list">
            {recentOrders.map((order) => (
              <div key={order.id} className="admin-list-row">
                <div>
                  <strong>{order.id}</strong>
                  <p>{new Date(order.date).toLocaleString()}</p>
                </div>
                <div>
                  <span>{order.items.length} items</span>
                  <span className="admin-status-pill">{order.status}</span>
                  <strong>{formatCurrency(order.total)}</strong>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="admin-empty">No orders have been placed yet.</p>
        )}
      </article>
    </section>
  );
}