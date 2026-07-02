const asset = (path) => `/assets/products/${path}`;

const CATALOG_STORAGE_KEY = 'velora_catalog';
const CATALOG_EVENT = 'velora:catalog-updated';

export const categories = [
  { id: 'streetwear', label: 'Streetwear' },
  { id: 'essentials', label: 'Essentials' },
  { id: 'outerwear', label: 'Outerwear' },
  { id: 'accessories', label: 'Accessories' }
];

const seedCatalog = [
  { id: 'streetwear-shadow-hoodie', slug: 'shadow-hoodie', name: 'Shadow Hoodie', category: 'streetwear', price: 1499, rating: 4.8, image: asset('streetwear/p1p1.jpg'), images: [asset('streetwear/p1p1.jpg'), asset('streetwear/p1p2.jpg'), asset('streetwear/p1p3.jpg'), asset('streetwear/p1p4.jpg')], badge: 'New', description: 'Soft fleece. Oversized fit.', details: ['Premium brushed fleece, 420 GSM', 'Relaxed fit with dropped shoulders', 'Ribbed cuffs and hem'], colors: ['Charcoal', 'Sand', 'Midnight'], sizes: ['XS', 'S', 'M', 'L', 'XL'], related: ['streetwear-night-runner-tee', 'streetwear-cargo-track-pants', 'outerwear-city-puffer-jacket'] },
  { id: 'streetwear-night-runner-tee', slug: 'night-runner-tee', name: 'Night Runner Tee', category: 'streetwear', price: 799, rating: 4.6, image: asset('streetwear/p2p1.jpg'), images: [asset('streetwear/p2p1.jpg'), asset('streetwear/p2p2.jpg'), asset('streetwear/p2p3.jpg'), asset('streetwear/p2p4.jpg')], badge: 'Hot', description: 'Breathable cotton jersey.', details: ['Soft cotton jersey', 'Relaxed silhouette', 'Everyday staple'], colors: ['Black', 'White', 'Olive'], sizes: ['S', 'M', 'L', 'XL'], related: ['streetwear-shadow-hoodie', 'streetwear-oversized-windbreaker'] },
  { id: 'streetwear-cargo-track-pants', slug: 'cargo-track-pants', name: 'Cargo Track Pants', category: 'streetwear', price: 1199, rating: 4.5, image: asset('streetwear/p3p1.jpg'), images: [asset('streetwear/p3p1.jpg'), asset('streetwear/p3p2.jpg'), asset('streetwear/p3p3.jpg'), asset('streetwear/p3p4.jpg')], badge: 'Core', description: 'Utility pockets. Tapered leg.', details: ['Tapered fit', 'Utility pockets', 'Stretch waistband'], colors: ['Black', 'Stone', 'Graphite'], sizes: ['S', 'M', 'L', 'XL'], related: ['streetwear-shadow-hoodie', 'essentials-relaxed-joggers'] },
  { id: 'streetwear-oversized-windbreaker', slug: 'oversized-windbreaker', name: 'Oversized Windbreaker', category: 'streetwear', price: 1599, rating: 4.7, image: asset('streetwear/p4p1.jpg'), images: [asset('streetwear/p4p1.jpg'), asset('streetwear/p4p2.jpg'), asset('streetwear/p4p3.jpg'), asset('streetwear/p4p4.jpg')], badge: 'Drop', description: 'Lightweight shell. Matte finish.', details: ['Lightweight shell', 'Matte finish', 'Oversized body'], colors: ['Navy', 'Black', 'Sand'], sizes: ['S', 'M', 'L', 'XL'], related: ['outwear-tech-shell-parka', 'streetwear-night-runner-tee'] },
  { id: 'essentials-core-cotton-tee', slug: 'core-cotton-tee', name: 'Core Cotton Tee', category: 'essentials', price: 699, rating: 4.4, image: asset('essentials/p1p1.jpg'), images: [asset('essentials/p1p1.jpg'), asset('essentials/p1p2.jpg'), asset('essentials/p1p3.jpg'), asset('essentials/p1p4.jpg')], badge: 'Best', description: 'Everyday weight. Clean finish.', details: ['Everyday weight', 'Clean finish', 'Breathable cotton'], colors: ['White', 'Black', 'Sand'], sizes: ['XS', 'S', 'M', 'L', 'XL'], related: ['essentials-daily-crew-sweatshirt', 'essentials-relaxed-joggers'] },
  { id: 'essentials-daily-crew-sweatshirt', slug: 'daily-crew-sweatshirt', name: 'Daily Crew Sweatshirt', category: 'essentials', price: 999, rating: 4.5, image: asset('essentials/p2p1.jpg'), images: [asset('essentials/p2p1.jpg'), asset('essentials/p2p2.jpg'), asset('essentials/p2p3.jpg'), asset('essentials/p2p4.jpg')], badge: 'Soft', description: 'Brushed interior. Relaxed fit.', details: ['Brushed interior', 'Relaxed fit', 'Midweight fleece'], colors: ['Grey', 'Black', 'Olive'], sizes: ['S', 'M', 'L', 'XL'], related: ['essentials-core-cotton-tee', 'essentials-classic-cap'] },
  { id: 'essentials-relaxed-joggers', slug: 'relaxed-joggers', name: 'Relaxed Joggers', category: 'essentials', price: 899, rating: 4.6, image: asset('essentials/p3p1.jpg'), images: [asset('essentials/p3p1.jpg'), asset('essentials/p3p2.jpg'), asset('essentials/p3p3.jpg'), asset('essentials/p3p4.jpg')], badge: 'New', description: 'Tapered leg. Ribbed cuff.', details: ['Tapered leg', 'Ribbed cuff', 'Soft hand feel'], colors: ['Black', 'Graphite', 'Sand'], sizes: ['S', 'M', 'L', 'XL'], related: ['essentials-core-cotton-tee', 'streetwear-cargo-track-pants'] },
  { id: 'essentials-classic-cap', slug: 'classic-cap', name: 'Classic Cap', category: 'essentials', price: 599, rating: 4.3, image: asset('essentials/p4p1.jpg'), images: [asset('essentials/p4p1.jpg'), asset('essentials/p4p2.jpg'), asset('essentials/p4p3.jpg'), asset('essentials/p4p4.jpg')], badge: 'Core', description: 'Structured crown. Matte logo.', details: ['Structured crown', 'Adjustable strap', 'Matte logo'], colors: ['Black', 'Stone', 'Navy'], sizes: ['OS'], related: ['essentials-core-cotton-tee'] },
  { id: 'outerwear-city-puffer-jacket', slug: 'city-puffer-jacket', name: 'City Puffer Jacket', category: 'outerwear', price: 2499, rating: 4.7, image: asset('outwear/p1p1.jpg'), images: [asset('outwear/p1p1.jpg'), asset('outwear/p1p2.jpg'), asset('outwear/p1p3.jpg'), asset('outwear/p1p4.jpg')], badge: 'Warm', description: 'Light fill. Matte nylon.', details: ['Warm fill', 'Matte nylon', 'City-ready silhouette'], colors: ['Black', 'Steel', 'Olive'], sizes: ['S', 'M', 'L', 'XL'], related: ['outerwear-tech-shell-parka', 'outerwear-studio-bomber'] },
  { id: 'outerwear-tech-shell-parka', slug: 'tech-shell-parka', name: 'Tech Shell Parka', category: 'outerwear', price: 2999, rating: 4.8, image: asset('outwear/p2p1.jpg'), images: [asset('outwear/p2p1.jpg'), asset('outwear/p2p2.jpg'), asset('outwear/p2p3.jpg'), asset('outwear/p2p4.jpg')], badge: 'Pro', description: 'Storm ready. Seam sealed.', details: ['Storm-ready shell', 'Seam sealed', 'Adjustable hood'], colors: ['Black', 'Graphite', 'Navy'], sizes: ['S', 'M', 'L', 'XL'], related: ['outerwear-city-puffer-jacket', 'outerwear-wool-blend-coat'] },
  { id: 'outerwear-studio-bomber', slug: 'studio-bomber', name: 'Studio Bomber', category: 'outerwear', price: 2299, rating: 4.6, image: asset('outwear/p3p1.jpg'), images: [asset('outwear/p3p1.jpg'), asset('outwear/p3p2.jpg'), asset('outwear/p3p3.jpg'), asset('outwear/p3p4.jpg')], badge: 'Icon', description: 'Smooth satin. Rib knit trim.', details: ['Satin finish', 'Rib knit trim', 'Light insulation'], colors: ['Black', 'Sage', 'Steel'], sizes: ['S', 'M', 'L', 'XL'], related: ['outerwear-city-puffer-jacket'] },
  { id: 'outerwear-wool-blend-coat', slug: 'wool-blend-coat', name: 'Wool Blend Coat', category: 'outerwear', price: 3499, rating: 4.9, image: asset('outwear/p4p1.jpg'), images: [asset('outwear/p4p1.jpg'), asset('outwear/p4p2.jpg'), asset('outwear/p4p3.jpg'), asset('outwear/p4p4.jpg')], badge: 'Tailored', description: 'Sharp lines. Soft structure.', details: ['Wool blend', 'Sharp lines', 'Soft structure'], colors: ['Charcoal', 'Camel', 'Black'], sizes: ['S', 'M', 'L', 'XL'], related: ['outerwear-tech-shell-parka'] },
  { id: 'accessories-minimalist-tote', slug: 'minimalist-tote', name: 'Minimalist Tote', category: 'accessories', price: 499, rating: 4.2, image: asset('accessories/p1p1.jpg'), images: [asset('accessories/p1p1.jpg'), asset('accessories/p1p2.jpg'), asset('accessories/p1p3.jpg'), asset('accessories/p1p4.jpg')], badge: 'Canvas', description: 'Roomy carry. Reinforced base.', details: ['Roomy carry', 'Reinforced base', 'Everyday canvas'], colors: ['Natural', 'Black'], sizes: ['OS'], related: ['accessories-canvas-belt-bag', 'accessories-chain-necklace'] },
  { id: 'accessories-leather-strap-watch', slug: 'leather-strap-watch', name: 'Leather Strap Watch', category: 'accessories', price: 799, rating: 4.4, image: asset('accessories/p2p1.jpg'), images: [asset('accessories/p2p1.jpg'), asset('accessories/p2p2.jpg'), asset('accessories/p2p3.jpg'), asset('accessories/p2p4.jpg')], badge: 'Limited', description: 'Matte dial. Slim profile.', details: ['Matte dial', 'Slim profile', 'Leather strap'], colors: ['Black', 'Brown'], sizes: ['OS'], related: ['accessories-chain-necklace'] },
  { id: 'accessories-chain-necklace', slug: 'chain-necklace', name: 'Chain Necklace', category: 'accessories', price: 599, rating: 4.5, image: asset('accessories/p3p1.jpg'), images: [asset('accessories/p3p1.jpg'), asset('accessories/p3p2.jpg'), asset('accessories/p3p3.jpg'), asset('accessories/p3p4.jpg')], badge: 'Steel', description: 'Brushed finish. Adjustable.', details: ['Brushed finish', 'Adjustable length', 'Steel build'], colors: ['Steel', 'Gold'], sizes: ['OS'], related: ['accessories-leather-strap-watch'] },
  { id: 'accessories-canvas-belt-bag', slug: 'canvas-belt-bag', name: 'Canvas Belt Bag', category: 'accessories', price: 699, rating: 4.3, image: asset('accessories/p4p1.jpg'), images: [asset('accessories/p4p1.jpg'), asset('accessories/p4p2.jpg'), asset('accessories/p4p3.jpg'), asset('accessories/p4p4.jpg')], badge: 'Everyday', description: 'Compact carry. Metal buckle.', details: ['Compact carry', 'Metal buckle', 'Durable canvas'], colors: ['Black', 'Sand'], sizes: ['OS'], related: ['accessories-minimalist-tote'] }
];

const parseList = (value) => String(value || '').split(',').map((item) => item.trim()).filter(Boolean);

const cloneCatalog = (items) => items.map((item) => ({
  ...item,
  details: Array.isArray(item.details) ? [...item.details] : [],
  colors: Array.isArray(item.colors) ? [...item.colors] : [],
  sizes: Array.isArray(item.sizes) ? [...item.sizes] : [],
  images: Array.isArray(item.images) ? [...item.images] : [item.image].filter(Boolean),
  related: Array.isArray(item.related) ? [...item.related] : []
}));

const defaultImage = '/assets/hero/banner1.jpg';

const ensureProductShape = (product) => {
  const image = product.image || product.images?.[0] || defaultImage;
  const images = Array.isArray(product.images) && product.images.length > 0 ? product.images.filter(Boolean) : [image];

  return {
    ...product,
    price: Number(product.price || 0),
    rating: Number(product.rating || 4),
    image,
    images,
    details: Array.isArray(product.details) ? product.details : parseList(product.details),
    colors: Array.isArray(product.colors) ? product.colors : parseList(product.colors),
    sizes: Array.isArray(product.sizes) ? product.sizes : parseList(product.sizes),
    related: Array.isArray(product.related) ? product.related : parseList(product.related)
  };
};

const readStoredCatalog = () => {
  try {
    const raw = localStorage.getItem(CATALOG_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    return parsed.map(ensureProductShape);
  } catch {
    return null;
  }
};

const initialCatalog = typeof window === 'undefined'
  ? cloneCatalog(seedCatalog).map(ensureProductShape)
  : readStoredCatalog() || cloneCatalog(seedCatalog).map(ensureProductShape);

export const catalog = [...initialCatalog];

const persistCatalog = () => {
  try {
    localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(catalog));
  } catch {
    // ignore persistence errors
  }
};

const emitCatalogUpdate = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(CATALOG_EVENT));
  }
};

const overwriteCatalog = (nextCatalog) => {
  catalog.splice(0, catalog.length, ...nextCatalog.map(ensureProductShape));
  if (typeof window !== 'undefined') {
    persistCatalog();
    emitCatalogUpdate();
  }
};

export function subscribeCatalog(listener) {
  if (typeof window === 'undefined') {
    return () => {};
  }
  window.addEventListener(CATALOG_EVENT, listener);
  return () => window.removeEventListener(CATALOG_EVENT, listener);
}

export function addCatalogProduct(product) {
  const normalized = ensureProductShape(product);
  if (catalog.some((item) => item.id === normalized.id)) {
    throw new Error('A product with this id already exists.');
  }
  overwriteCatalog([...catalog, normalized]);
  return normalized;
}

export function updateCatalogProduct(id, updates) {
  const index = catalog.findIndex((item) => item.id === id);
  if (index < 0) {
    throw new Error('Product not found.');
  }

  const existing = catalog[index];
  const merged = ensureProductShape({ ...existing, ...updates });
  const nextCatalog = [...catalog];
  nextCatalog[index] = merged;
  overwriteCatalog(nextCatalog);
  return merged;
}

export const getProductById = (id) => catalog.find((item) => item.id === id);
export const getProductBySlug = (slug) => catalog.find((item) => item.slug === slug);
