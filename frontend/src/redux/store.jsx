import { configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "./api/jwtApi";
import authReducer from "./api/authSlice";

export const store = configureStore({
    reducer: {
        [AuthApi.reducerPath]: AuthApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(AuthApi.middleware),
});