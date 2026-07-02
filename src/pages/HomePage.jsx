import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { catalog as CATALOG, categories as CATEGORY_OPTIONS, subscribeCatalog } from '../data/catalog';
import { ProductCard } from '../components/ProductCard';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addToCart } from '../app/slices/cartSlice';
import { toggleWishlist } from '../app/slices/wishlistSlice';
import { toast } from 'react-toastify';

const sorters = {
  featured: (a, b) => b.rating - a.rating,
  priceLow: (a, b) => a.price - b.price,
  priceHigh: (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating
};

export default function HomePage() {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('featured');
  const [page, setPage] = useState(1);
  const [, setCatalogVersion] = useState(0);

  useEffect(() => subscribeCatalog(() => setCatalogVersion((value) => value + 1)), []);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return [...CATALOG]
      .filter((product) => (category === 'all' ? true : product.category === category))
      .filter((product) => !search || product.name.toLowerCase().includes(search) || product.description.toLowerCase().includes(search) || product.category.toLowerCase().includes(search))
      .sort(sorters[sort]);
  }, [category, query, sort]);

  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, variantKey: 'default', quantity: 1 }));
    toast.success(`${product.name} added to bag`);
  };

  const handleToggleWishlist = (product) => {
    dispatch(toggleWishlist(product));
    toast.dark(`${product.name} updated in wishlist`);
  };

  return (
    <>
      <section className="hero-banner">
        <div className="hero-copy">
          <p>Curated drops for modern wardrobes</p>
          <h1>Velora, rebuilt for fast shopping and local-first state.</h1>
          <div className="hero-actions">
            <a href="#catalog" className="primary-btn">Shop now</a>
            <a href="#catalog" className="secondary-btn">Browse collection</a>
          </div>
        </div>
        <div className="hero-panel">
          <img src="/assets/hero/banner1.jpg" alt="Velora hero" />
        </div>
      </section>

      <section className="container catalog-section" id="catalog">
        <div className="section-toolbar">
          <div>
            <p className="eyebrow">Shop the edit</p>
            <h2>Curated categories</h2>
          </div>
          <div className="toolbar-controls">
            <input value={query} onChange={(event) => { setPage(1); setQuery(event.target.value); }} placeholder="Search products" />
            <select value={category} onChange={(event) => { setPage(1); setCategory(event.target.value); }}>
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="category-tabs">
          <button type="button" className={'all' === category ? 'active' : ''} onClick={() => { setPage(1); setCategory('all'); }}>
            All
          </button>
          {CATEGORY_OPTIONS.map((item) => (
            <button key={item.id} type="button" className={item.id === category ? 'active' : ''} onClick={() => { setPage(1); setCategory(item.id); }}>
              {item.label}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {visible.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={wishlist.some((item) => item.id === product.id)}
            />
          ))}
        </div>

        <div className="pagination-row">
          <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1}>Prev</button>
          <span>Page {page} of {totalPages}</span>
          <button type="button" onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={page === totalPages}>Next</button>
        </div>
      </section>
    </>
  );
}