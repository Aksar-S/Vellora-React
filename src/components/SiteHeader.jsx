import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBagShopping, FaHeart, FaMagnifyingGlass, FaReceipt, FaUser } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { logoutUser } from '../slices/authSlice';

export function SiteHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const cartCount = useSelector((state) => state.cart.items.reduce((sum, item) => sum + (item.quantity || 1), 0));
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/products${search.trim() ? `?query=${encodeURIComponent(search.trim())}` : ''}`);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand-mark">
          <img src="/assets/title.png" alt="Velora" />
        </Link>
        <form className="header-search" onSubmit={handleSearchSubmit} role="search">
          <FaMagnifyingGlass />
          <input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Search for products..." aria-label="Search products" />
        </form>
        <nav className="header-nav">
          <NavLink to="/wishlist" className="nav-icon">
            <FaHeart />
            {wishlistCount > 0 ? <span>{wishlistCount}</span> : null}
          </NavLink>
          <NavLink to="/cart" className="nav-icon">
            <FaBagShopping />
            {cartCount > 0 ? <span>{cartCount}</span> : null}
          </NavLink>
          <NavLink to="/orders" className="nav-icon"><FaReceipt /></NavLink>
          <NavLink to="/profile" className="nav-icon"><FaUser /></NavLink>
          {currentUser ? (
            <button type="button" className="nav-pill" onClick={handleLogout}>Log out</button>
          ) : (
            <NavLink to="/login" className="nav-pill">Sign in</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}