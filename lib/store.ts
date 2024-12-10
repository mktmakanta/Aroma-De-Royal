import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "@/services/products";
import counter from "@/providers/counter";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    counter: counter.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
