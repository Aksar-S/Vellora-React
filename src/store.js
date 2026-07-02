import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import ordersReducer from './slices/ordersSlice';
import profileReducer from './slices/profileSlice';
import reviewsReducer from './slices/reviewsSlice';
import { safeRead } from './utils/storage';

const preloadedState = {
  auth: {
    users: safeRead('velora_users', []),
    currentUser: safeRead('velora_current_user', null)
  },
  cart: {
    items: safeRead('velora_cart', [])
  },
  wishlist: {
    items: safeRead('velora_wishlist', [])
  },
  orders: {
    items: safeRead('velora_orders', []),
    lastOrder: safeRead('velora_last_order', null)
  },
  profile: {
    items: safeRead('velora_profiles', {})
  },
  reviews: {
    items: safeRead('velora_reviews', [])
  }
};

const storageMiddleware = (storeApi) => (next) => (action) => {
  const result = next(action);
  const state = storeApi.getState();
  try {
    localStorage.setItem('velora_cart', JSON.stringify(state.cart.items));
    localStorage.setItem('velora_wishlist', JSON.stringify(state.wishlist.items));
    localStorage.setItem('velora_users', JSON.stringify(state.auth.users));
    localStorage.setItem('velora_current_user', JSON.stringify(state.auth.currentUser));
    localStorage.setItem('velora_orders', JSON.stringify(state.orders.items));
    localStorage.setItem('velora_last_order', JSON.stringify(state.orders.lastOrder));
    localStorage.setItem('velora_profiles', JSON.stringify(state.profile.items));
    localStorage.setItem('velora_reviews', JSON.stringify(state.reviews.items));
  } catch {
    // ignore persistence errors
  }
  return result;
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: ordersReducer,
    profile: profileReducer,
    reviews: reviewsReducer
  },
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(storageMiddleware)
});