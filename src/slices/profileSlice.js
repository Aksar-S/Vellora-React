import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    items: {}
  },
  reducers: {
    saveProfile(state, action) {
      const { email, profile } = action.payload;
      if (email) {
        state.items[email] = profile;
      }
    }
  }
});

export const { saveProfile } = profileSlice.actions;
export default profileSlice.reducer;