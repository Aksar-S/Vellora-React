import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { addCatalogProduct, catalog, categories, subscribeCatalog, updateCatalogProduct } from '../../data/catalog';
import { formatCurrency } from '../../utils/storage';

const blankForm = {
  name: '',
  category: 'streetwear',
  price: '',
  rating: '4.5',
  badge: 'New',
  description: '',
  details: '',
  colors: '',
  sizes: '',
  related: ''
};

const toSlug = (value) => String(value || '').toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
const parseList = (value) => String(value || '').split(',').map((item) => item.trim()).filter(Boolean);

const buildProductForm = (product) => ({
  name: product.name || '',
  category: product.category || 'streetwear',
  price: String(product.price ?? ''),
  rating: String(product.rating ?? '4.5'),
  badge: product.badge || 'New',
  description: product.description || '',
  details: (product.details || []).join(', '),
  colors: (product.colors || []).join(', '),
  sizes: (product.sizes || []).join(', '),
  related: (product.related || []).join(', '),
  image: product.image || ''
});

const fallbackImageByCategory = (category) => {
  const match = catalog.find((product) => product.category === category);
  return match?.image || '/assets/hero/banner1.jpg';
};

export default function AdminProductsPage() {
  const [version, setVersion] = useState(0);
  const [addForm, setAddForm] = useState(blankForm);
  const [editId, setEditId] = useState('');
  const [editForm, setEditForm] = useState(null);

  useEffect(() => subscribeCatalog(() => setVersion((value) => value + 1)), []);

  const products = useMemo(() => [...catalog], [version]);

  const startEditing = (product) => {
    setEditId(product.id);
    setEditForm(buildProductForm(product));
  };

  const handleAddProduct = (event) => {
    event.preventDefault();

    const slug = toSlug(addForm.name);
    if (!slug) {
      toast.error('Please enter a valid product name.');
      return;
    }

    const id = `${addForm.category}-${slug}`;
    if (catalog.some((item) => item.id === id)) {
      toast.error('A product with this generated id already exists. Change the product name.');
      return;
    }

    addCatalogProduct({
      id,
      slug,
      name: addForm.name.trim(),
      category: addForm.category,
      price: Number(addForm.price || 0),
      rating: Number(addForm.rating || 4.5),
      badge: addForm.badge.trim() || 'New',
      description: addForm.description.trim(),
      details: parseList(addForm.details),
      colors: parseList(addForm.colors),
      sizes: parseList(addForm.sizes),
      related: parseList(addForm.related),
      image: fallbackImageByCategory(addForm.category),
      images: [fallbackImageByCategory(addForm.category)]
    });

    setAddForm(blankForm);
    toast.success('Product added to catalog.');
  };

  const handleEditProduct = (event) => {
    event.preventDefault();
    if (!editId || !editForm) return;

    const current = catalog.find((item) => item.id === editId);
    if (!current) {
      toast.error('Selected product no longer exists.');
      return;
    }

    const slug = toSlug(editForm.name) || current.slug;
    updateCatalogProduct(editId, {
      slug,
      name: editForm.name.trim(),
      category: editForm.category,
      price: Number(editForm.price || 0),
      rating: Number(editForm.rating || current.rating || 4.5),
      badge: editForm.badge.trim() || current.badge,
      description: editForm.description.trim(),
      details: parseList(editForm.details),
      colors: parseList(editForm.colors),
      sizes: parseList(editForm.sizes),
      related: parseList(editForm.related),
      image: editForm.image.trim() || current.image,
      images: [editForm.image.trim() || current.image]
    });

    setEditId('');
    setEditForm(null);
    toast.success('Product updated successfully.');
  };

  return (
    <section className="admin-content-grid admin-products-page">
      <header className="admin-page-header soft-card">
        <div>
          <p className="eyebrow">Products</p>
          <h1>Product controls</h1>
        </div>
        <p className="admin-page-copy">Add new products and edit existing items. Changes are reflected in the storefront categories immediately.</p>
      </header>

      <div className="admin-form-grid">
        <form className="soft-card admin-panel admin-edit-form" onSubmit={handleAddProduct}>
          <div className="admin-panel-header">
            <div>
              <p className="eyebrow">Add product</p>
              <h2>Create a new product</h2>
            </div>
          </div>

          <label className="admin-field"><span>Name</span><input value={addForm.name} onChange={(event) => setAddForm({ ...addForm, name: event.target.value })} required /></label>
          <label className="admin-field"><span>Category</span><select value={addForm.category} onChange={(event) => setAddForm({ ...addForm, category: event.target.value })}>{categories.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
          <div className="admin-inline-fields">
            <label className="admin-field"><span>Price</span><input type="number" min="0" value={addForm.price} onChange={(event) => setAddForm({ ...addForm, price: event.target.value })} required /></label>
            <label className="admin-field"><span>Rating</span><input type="number" min="1" max="5" step="0.1" value={addForm.rating} onChange={(event) => setAddForm({ ...addForm, rating: event.target.value })} required /></label>
          </div>
          <label className="admin-field"><span>Badge</span><input value={addForm.badge} onChange={(event) => setAddForm({ ...addForm, badge: event.target.value })} /></label>
          <label className="admin-field"><span>Description</span><textarea rows="2" value={addForm.description} onChange={(event) => setAddForm({ ...addForm, description: event.target.value })} required /></label>
          <label className="admin-field"><span>Details (comma separated)</span><textarea rows="2" value={addForm.details} onChange={(event) => setAddForm({ ...addForm, details: event.target.value })} /></label>
          <label className="admin-field"><span>Colors (comma separated)</span><input value={addForm.colors} onChange={(event) => setAddForm({ ...addForm, colors: event.target.value })} /></label>
          <label className="admin-field"><span>Sizes (comma separated)</span><input value={addForm.sizes} onChange={(event) => setAddForm({ ...addForm, sizes: event.target.value })} /></label>
          <label className="admin-field"><span>Related product IDs (comma separated)</span><input value={addForm.related} onChange={(event) => setAddForm({ ...addForm, related: event.target.value })} /></label>
          <label className="admin-field"><span>Image URL (blocked for add)</span><input value="Auto-assigned from category" disabled /></label>

          <button type="submit" className="primary-btn">Add product</button>
        </form>

        <form className="soft-card admin-panel admin-edit-form" onSubmit={handleEditProduct}>
          <div className="admin-panel-header">
            <div>
              <p className="eyebrow">Edit product</p>
              <h2>Update an existing product</h2>
            </div>
          </div>

          {editForm ? (
            <>
              <label className="admin-field"><span>Product id</span><input value={editId} disabled /></label>
              <label className="admin-field"><span>Name</span><input value={editForm.name} onChange={(event) => setEditForm({ ...editForm, name: event.target.value })} required /></label>
              <label className="admin-field"><span>Category</span><select value={editForm.category} onChange={(event) => setEditForm({ ...editForm, category: event.target.value })}>{categories.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
              <div className="admin-inline-fields">
                <label className="admin-field"><span>Price</span><input type="number" min="0" value={editForm.price} onChange={(event) => setEditForm({ ...editForm, price: event.target.value })} required /></label>
                <label className="admin-field"><span>Rating</span><input type="number" min="1" max="5" step="0.1" value={editForm.rating} onChange={(event) => setEditForm({ ...editForm, rating: event.target.value })} required /></label>
              </div>
              <label className="admin-field"><span>Badge</span><input value={editForm.badge} onChange={(event) => setEditForm({ ...editForm, badge: event.target.value })} /></label>
              <label className="admin-field"><span>Description</span><textarea rows="2" value={editForm.description} onChange={(event) => setEditForm({ ...editForm, description: event.target.value })} required /></label>
              <label className="admin-field"><span>Details (comma separated)</span><textarea rows="2" value={editForm.details} onChange={(event) => setEditForm({ ...editForm, details: event.target.value })} /></label>
              <label className="admin-field"><span>Colors (comma separated)</span><input value={editForm.colors} onChange={(event) => setEditForm({ ...editForm, colors: event.target.value })} /></label>
              <label className="admin-field"><span>Sizes (comma separated)</span><input value={editForm.sizes} onChange={(event) => setEditForm({ ...editForm, sizes: event.target.value })} /></label>
              <label className="admin-field"><span>Related product IDs (comma separated)</span><input value={editForm.related} onChange={(event) => setEditForm({ ...editForm, related: event.target.value })} /></label>
              <label className="admin-field"><span>Image URL</span><input value={editForm.image} onChange={(event) => setEditForm({ ...editForm, image: event.target.value })} /></label>
              <button type="submit" className="primary-btn">Save changes</button>
            </>
          ) : (
            <p className="admin-empty">Click an edit button from the product list below to load fields.</p>
          )}
        </form>
      </div>

      <article className="soft-card admin-panel admin-products-panel">
        <div className="admin-table-head">
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span>Rating</span>
          <span>Action</span>
        </div>

        <div className="admin-table-body">
          {products.map((product) => (
            <div key={product.id} className="admin-table-row">
              <div className="admin-product-cell">
                <img src={product.image} alt={product.name} />
                <div>
                  <strong>{product.name}</strong>
                  <p>{product.badge}</p>
                </div>
              </div>
              <span>{product.category}</span>
              <span>{formatCurrency(product.price)}</span>
              <span>{product.rating}</span>
              <button type="button" className="secondary-btn admin-row-action" onClick={() => startEditing(product)}>Edit</button>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}