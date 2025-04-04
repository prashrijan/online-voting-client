import { configureStore } from "@redux/toolkit";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});
