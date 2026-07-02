import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { catalog, getProductBySlug, subscribeCatalog } from '../data/catalog';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addReview } from '../slices/reviewsSlice';
import { addToCart } from '../slices/cartSlice';
import { toggleWishlist } from '../slices/wishlistSlice';

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const [catalogVersion, setCatalogVersion] = useState(0);
  const product = useMemo(() => getProductBySlug(productId) || catalog.find((item) => item.id === productId), [productId, catalogVersion]);
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => state.reviews.items.filter((item) => item.productId === product?.id));
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'OS');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [reviewForm, setReviewForm] = useState({ name: currentUser?.name || '', rating: 5, comment: '' });

  useEffect(() => subscribeCatalog(() => setCatalogVersion((value) => value + 1)), []);

  useEffect(() => {
    if (!product) return;
    setSelectedImage(product.images?.[0] || product.image || '');
    setSelectedSize(product.sizes?.[0] || 'OS');
    setSelectedColor(product.colors?.[0] || '');
  }, [product]);

  if (!product) {
    return (
      <div className="auth-card simple-page">
        <h1>Product not found</h1>
        <Link to="/products">Back to products</Link>
      </div>
    );
  }

  const isWishlisted = wishlistItems.some((item) => item.id === product.id);
  const visibleReviews = reviews.length > 0 ? reviews : [{ id: 'sample', name: 'Velora user', rating: 5, comment: 'Clean fit, fast delivery, and the app flow feels polished.', createdAt: new Date().toISOString() }];
  const related = product.related.map((relatedId) => catalog.find((item) => item.id === relatedId)).filter(Boolean);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, options: { Size: selectedSize, Color: selectedColor }, variantKey: `Size:${selectedSize}|Color:${selectedColor}` }));
    toast.success(`${product.name} added to bag`);
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist({ ...product, options: { Size: selectedSize, Color: selectedColor }, variantKey: `Size:${selectedSize}|Color:${selectedColor}` }));
    toast.info(isWishlisted ? `${product.name} removed from wishlist` : `${product.name} saved to wishlist`);
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    if (!reviewForm.comment.trim()) {
      toast.error('Add a review comment first');
      return;
    }
    dispatch(addReview({
      productId: product.id,
      review: {
        name: reviewForm.name.trim() || currentUser?.name || 'Guest',
        rating: Number(reviewForm.rating) || 5,
        comment: reviewForm.comment.trim()
      }
    }));
    setReviewForm((current) => ({ ...current, comment: '', rating: 5 }));
    toast.success('Review saved');
  };

  return (
    <div className="product-layout">
      <section className="product-gallery">
        <div className="soft-card main-image-wrap">
          <img src={selectedImage} alt={product.name} className="main-image" />
        </div>
        <div className="thumb-row">
          {product.images.map((image) => (
            <button key={image} type="button" onClick={() => setSelectedImage(image)}>
              <img src={image} alt={product.name} />
            </button>
          ))}
        </div>
      </section>

      <section className="product-summary">
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="price-line">₹{product.price}</p>
        <p>{product.description}</p>
        <div className="action-row">
          <button className="primary-btn" type="button" onClick={handleAddToCart}>Add to bag</button>
          <button className="secondary-btn" type="button" onClick={handleWishlist}>Save to wishlist</button>
        </div>
        <div className="feature-list">
          {product.details.map((detail) => <span key={detail}>{detail}</span>)}
        </div>

        <form className="review-card" onSubmit={handleReviewSubmit}>
          <h2>Add review</h2>
          <select value={reviewForm.rating} onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}>{[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} stars</option>)}</select>
          <textarea value={reviewForm.comment} onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })} placeholder="Write your review" required />
          <button className="primary-btn" type="submit">Submit review</button>
        </form>

        <div className="review-list">
          {visibleReviews.map((item) => (
            <article key={item.id} className="auth-card">
              <strong>{item.rating} stars</strong>
              <p>{item.comment || item.text}</p>
            </article>
          ))}
        </div>

        <div className="review-card">
          <h2>Related products</h2>
          <div className="grid-cards related-grid">
            {related.map((item) => (
              <Link key={item.id} to={`/product/${item.slug}`} className="product-card">
                <img src={item.image} alt={item.name} />
                <div className="product-card-body">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}