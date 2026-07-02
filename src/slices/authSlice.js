import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    users: [],
    currentUser: null
  },
  reducers: {
    registerUser(state, action) {
      state.users.push(action.payload);
    },
    loginUser(state, action) {
      state.currentUser = action.payload;
    },
    logoutUser(state) {
      state.currentUser = null;
    },
    updateCurrentUser(state, action) {
      state.currentUser = { ...state.currentUser, ...action.payload };
      state.users = state.users.map((user) => (user.email === state.currentUser?.email ? { ...user, ...state.currentUser } : user));
    }
  }
});

export const { registerUser, loginUser, logoutUser, updateCurrentUser } = authSlice.actions;
export default authSlice.reducer;