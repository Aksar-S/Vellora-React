import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const variantKey = item.variantKey || 'default';
      const existing = state.items.find((cartItem) => cartItem.id === item.id && (cartItem.variantKey || 'default') === variantKey);
      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        state.items.push({ ...item, variantKey, quantity: item.quantity || 1 });
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => !(item.id === action.payload.id && (item.variantKey || 'default') === (action.payload.variantKey || 'default')));
    },
    updateQuantity(state, action) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload.id && (cartItem.variantKey || 'default') === (action.payload.variantKey || 'default'));
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
    },
    clearCart(state) {
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;