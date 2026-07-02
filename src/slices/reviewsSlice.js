import { createSlice } from '@reduxjs/toolkit';

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    items: []
  },
  reducers: {
    addReview(state, action) {
      state.items.unshift(action.payload);
    }
  }
});

export const { addReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;