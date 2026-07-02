import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaPinterest, FaTiktok, FaYoutube } from 'react-icons/fa6';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <img src="/assets/title.png" alt="Velora" className="footer-logo" />
          <p>Premium essentials, curated drops, and seasonal edits delivered with style.</p>
        </div>
        <div>
          <h3>Shop</h3>
          <Link to="/products">New arrivals</Link>
          <Link to="/products">Best sellers</Link>
          <Link to="/products">Collections</Link>
          <Link to="/products">Sale</Link>
        </div>
        <div>
          <h3>Support</h3>
          <Link to="/orders">Order tracking</Link>
          <Link to="/cart">Returns</Link>
          <Link to="/checkout">Shipping</Link>
          <Link to="/profile">Contact</Link>
        </div>
        <div>
          <h3>Connect</h3>
          <div className="social-row">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok"><FaTiktok /></a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest"><FaPinterest /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
          </div>
          <a href="mailto:support@velora.com">support@velora.com</a>
        </div>
      </div>
    </footer>
  );
}