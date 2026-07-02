export const safeRead = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const formatCurrency = (amount) => `₹${Number(amount || 0).toFixed(2)}`;

export const buildOrderId = () => `VLR-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;