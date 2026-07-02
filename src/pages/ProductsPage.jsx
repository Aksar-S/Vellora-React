import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { FaFilter, FaSort, FaRotateLeft } from 'react-icons/fa6';
import { catalog, categories, subscribeCatalog } from '../data/catalog';
import { ProductCard } from '../components/ProductCard';
import { addToCart } from '../slices/cartSlice';
import { toggleWishlist } from '../slices/wishlistSlice';
import { toast } from 'react-toastify';

export default function ProductsPage() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('featured');
  const [page, setPage] = useState(1);
  const [, setCatalogVersion] = useState(0);
  const pageSize = 8;

  useEffect(() => {
    const incomingQuery = searchParams.get('query') || '';
    setQuery(incomingQuery);
    setPage(1);
  }, [searchParams]);

  useEffect(() => subscribeCatalog(() => setCatalogVersion((value) => value + 1)), []);

  const products = useMemo(() => {
    const search = query.trim().toLowerCase();
    let items = [...catalog];
    if (category !== 'all') {
      items = items.filter((product) => product.category === category);
    }
    if (search) {
      items = items.filter((product) => [product.name, product.description, product.category].join(' ').toLowerCase().includes(search));
    }
    if (sort === 'priceLow') items.sort((a, b) => a.price - b.price);
    if (sort === 'priceHigh') items.sort((a, b) => b.price - a.price);
    if (sort === 'rating') items.sort((a, b) => b.rating - a.rating);
    if (sort === 'featured') items.sort((a, b) => b.rating - a.rating);
    return items;
  }, [category, query, sort]);

  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const visible = products.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to bag`);
  };

  const handleToggleWishlist = (product) => {
    dispatch(toggleWishlist(product));
    toast.dark(`${product.name} updated in wishlist`);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="soft-card rounded-[2rem] bg-white p-5">
        <p className="eyebrow">Catalog</p>
        <h1 className="mt-2 text-3xl font-semibold">Products</h1>

        <div className="mt-6 grid gap-5">
          <label className="grid gap-2 text-sm font-semibold text-neutral-700">
            Search
            <input value={query} onChange={(event) => { setPage(1); setQuery(event.target.value); }} placeholder="Search products" className="rounded-2xl border border-neutral-200 px-4 py-3 outline-none focus:border-neutral-950" />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-neutral-700">
            Category
            <select value={category} onChange={(event) => { setPage(1); setCategory(event.target.value); }} className="rounded-2xl border border-neutral-200 px-4 py-3 outline-none focus:border-neutral-950">
              <option value="all">All categories</option>
              {categories.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-semibold text-neutral-700">
            Sort
            <select value={sort} onChange={(event) => { setPage(1); setSort(event.target.value); }} className="rounded-2xl border border-neutral-200 px-4 py-3 outline-none focus:border-neutral-950">
              <option value="featured">Featured</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </label>

          <button type="button" onClick={() => { setQuery(''); setCategory('all'); setSort('featured'); setPage(1); }} className="secondary-btn justify-center">
            <FaRotateLeft /> Reset filters
          </button>
        </div>
      </aside>

      <section className="grid gap-6">
        <div className="soft-card rounded-[2rem] bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Search results</p>
              <h2 className="mt-1 text-2xl font-semibold">{products.length} products found</h2>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-neutral-500">
              <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-2"><FaFilter /> Filters active</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-2"><FaSort /> Sort: {sort}</span>
            </div>
          </div>
        </div>

        {visible.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.some((item) => item.id === product.id)}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="soft-card rounded-[2rem] bg-white p-10 text-center">
            <h3 className="text-2xl font-semibold">No products match your filters</h3>
            <p className="mt-2 text-neutral-600">Try clearing the search, category, or sort options.</p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={safePage === 1} className="secondary-btn disabled:cursor-not-allowed disabled:opacity-40">
            Previous
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((value) => (
              <button key={value} type="button" onClick={() => setPage(value)} className={`h-10 w-10 rounded-full border text-sm font-semibold ${safePage === value ? 'border-neutral-950 bg-neutral-950 text-white' : 'border-neutral-200 bg-white'}`}>
                {value}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={safePage === totalPages} className="secondary-btn disabled:cursor-not-allowed disabled:opacity-40">
            Next
          </button>
        </div>
      </section>
    </div>
  );
}