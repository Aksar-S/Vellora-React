import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaStar, FaBagShopping } from 'react-icons/fa6';

export function ProductCard({ product, isWishlisted, onAddToCart, onToggleWishlist }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.slug}`} className="product-media">
        <img src={product.image} alt={product.name} loading="lazy" />
      </Link>
      <div className="product-card-body">
        <div className="product-meta-row">
          <div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>
          <button type="button" className={`wishlist-toggle ${isWishlisted ? 'active' : ''}`} onClick={() => onToggleWishlist(product)} aria-label="Wishlist">
            <FaHeart />
          </button>
        </div>
        <div className="product-rating">
          <FaStar />
          <span>{product.rating}</span>
          <span className="category-chip">{product.category}</span>
        </div>
        <div className="product-footer">
          <strong>₹{product.price}</strong>
          <button type="button" className="primary-btn" onClick={() => onAddToCart(product)}>
            <FaBagShopping /> Add
          </button>
        </div>
      </div>
    </article>
  );
}