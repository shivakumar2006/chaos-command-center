import { configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "./api/jwtApi";
import authReducer from "./api/authSlice";
import { InternalApi } from "./api/internal";

export const store = configureStore({
    reducer: {
        [AuthApi.reducerPath]: AuthApi.reducer,
        [InternalApi.reducerPath]: InternalApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(AuthApi.middleware, InternalApi.middleware),
});