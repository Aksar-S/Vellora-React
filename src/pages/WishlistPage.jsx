import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBagShopping, FaTrash } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { removeFromWishlist } from '../slices/wishlistSlice';
import { toast } from 'react-toastify';

export default function WishlistPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.wishlist.items);

  return (
    <section className="container simple-page">
      <h1>Your wishlist</h1>
      {items.length === 0 ? <p>Your wishlist is empty. <Link to="/">Explore products</Link></p> : (
        <div className="grid-cards">
          {items.map((item) => (
            <article key={item.id} className="product-card">
              <img src={item.image} alt={item.name} />
              <div className="product-card-body">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <button type="button" className="primary-btn" onClick={() => { dispatch(addToCart(item)); toast.success('Moved to cart'); }}>Move to cart</button>
                <button type="button" className="secondary-btn" onClick={() => { dispatch(removeFromWishlist(item)); toast.info('Removed from wishlist'); }}>Remove</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}