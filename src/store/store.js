import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@features/user/userSlice';
import electionReducer from '@features/election/elecitonSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    election: electionReducer,
  },
});
