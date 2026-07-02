import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: []
  },
  reducers: {
    toggleWishlist(state, action) {
      const existingIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    }
  }
});

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;