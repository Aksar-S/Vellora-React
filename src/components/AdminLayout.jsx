import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaChartLine, FaBoxesStacked, FaClipboardList, FaRightFromBracket, FaShieldHalved } from 'react-icons/fa6';
import { logoutAdmin } from '../admin/adminAuth';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: FaChartLine, end: true },
  { to: '/admin/products', label: 'Products', icon: FaBoxesStacked },
  { to: '/admin/orders', label: 'Orders', icon: FaClipboardList }
];

export function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin-login');
  };

  return (
    <div className="admin-shell container page-enter">
      <aside className="admin-sidebar soft-card">
        <div className="admin-brand">
          <div className="admin-brand-mark">
            <FaShieldHalved />
          </div>
          <div>
            <p className="eyebrow">Back office</p>
            <h1>Velora Admin</h1>
          </div>
        </div>

        <nav className="admin-nav" aria-label="Admin navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <button type="button" className="secondary-btn admin-logout" onClick={handleLogout}>
          <FaRightFromBracket />
          Sign out
        </button>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}