import { configureStore, combinedReducers } from "@reduxjs/toolkit";
import { AuthApi } from "./api/jwtApi";

const rootReducer = combinedReducers({
    [AuthApi.reducerPath]: AuthApi.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(AuthApi.middleware)
})