import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
    lastOrder: null
  },
  reducers: {
    placeOrder(state, action) {
      state.items.unshift(action.payload);
      state.lastOrder = action.payload;
    },
    updateOrderStatus(state, action) {
      const { orderId, status } = action.payload;
      const order = state.items.find((item) => item.id === orderId);
      if (order) {
        order.status = status;
      }
      if (state.lastOrder?.id === orderId) {
        state.lastOrder = { ...state.lastOrder, status };
      }
    }
  }
});

export const { placeOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;