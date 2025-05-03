import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  activeUsers: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setActiveUsers: (state, action) => {
      state.activeUsers = action.payload;
    },
    resetUser: (state) => {
      state.user = {};
    },
  },
});

export const { setUser, setActiveUsers, resetUser } = userSlice.actions;

export default userSlice.reducer;
