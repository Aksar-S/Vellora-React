import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatCurrency } from '../../utils/storage';
import { updateOrderStatus } from '../../slices/ordersSlice';

const orderStatusOptions = ['Processing', 'Cancelled', 'Dispatched', 'Completed'];

export default function AdminOrdersPage() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.items);
  const [expandedOrderId, setExpandedOrderId] = useState('');

  const toggleExpanded = (orderId) => {
    setExpandedOrderId((current) => (current === orderId ? '' : orderId));
  };

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ orderId, status }));
    toast.success(`Order ${orderId} marked as ${status}.`);
  };

  return (
    <section className="admin-content-grid">
      <header className="admin-page-header soft-card">
        <div>
          <p className="eyebrow">Orders</p>
          <h1>Order management</h1>
        </div>
        <p className="admin-page-copy">Review the latest customer orders saved locally by the storefront.</p>
      </header>

      <article className="soft-card admin-panel">
        {orders.length > 0 ? (
          <div className="admin-orders-list">
            {orders.map((order) => (
              <div key={order.id} className="admin-order-expandable soft-card">
                <button type="button" className="admin-order-summary" onClick={() => toggleExpanded(order.id)}>
                  <div>
                    <strong>{order.id}</strong>
                    <p>{new Date(order.date).toLocaleString()}</p>
                  </div>
                  <div>
                    <span>Status</span>
                    <strong>{order.status}</strong>
                  </div>
                  <div>
                    <span>Items</span>
                    <strong>{order.items.length}</strong>
                  </div>
                  <div>
                    <span>Total</span>
                    <strong>{formatCurrency(order.total)}</strong>
                  </div>
                  <div>
                    <span>Customer</span>
                    <strong>{order.shipping?.name || 'Guest'}</strong>
                  </div>
                  <span className="admin-order-toggle">{expandedOrderId === order.id ? 'Hide details' : 'View details'}</span>
                </button>

                {expandedOrderId === order.id ? (
                  <div className="admin-order-details">
                    <div className="admin-order-status-row">
                      <label className="admin-field">
                        <span>Update status</span>
                        <select value={order.status || 'Processing'} onChange={(event) => handleStatusChange(order.id, event.target.value)}>
                          {orderStatusOptions.map((status) => <option key={status} value={status}>{status}</option>)}
                        </select>
                      </label>
                    </div>

                    <div className="admin-order-grid">
                      <div>
                        <h3>Customer details</h3>
                        <p><strong>Name:</strong> {order.shipping?.name || 'Guest'}</p>
                        <p><strong>Email:</strong> {order.shipping?.email || '-'}</p>
                        <p><strong>Phone:</strong> {order.shipping?.phone || '-'}</p>
                      </div>
                      <div>
                        <h3>Shipping address</h3>
                        <p>{order.shipping?.address || '-'}</p>
                        <p>{order.shipping?.city || '-'}, {order.shipping?.state || '-'}</p>
                        <p>Pincode: {order.shipping?.pincode || '-'}</p>
                      </div>
                    </div>

                    <div className="admin-order-items">
                      <h3>Products in this order</h3>
                      {order.items.map((item) => (
                        <div key={`${order.id}-${item.id}-${item.variantKey || 'default'}`} className="admin-order-item-row">
                          <div>
                            <strong>{item.name}</strong>
                            <p>{item.category}</p>
                          </div>
                          <div>
                            <span>Qty: {item.quantity || 1}</span>
                            <strong>{formatCurrency((item.quantity || 1) * item.price)}</strong>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <div className="admin-empty-state">
            <h2>No orders yet</h2>
            <p>The storefront has not recorded any orders.</p>
            <Link to="/products" className="secondary-btn">View store</Link>
          </div>
        )}
      </article>
    </section>
  );
}