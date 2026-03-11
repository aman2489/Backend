import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices_features/couterSlice";
import themeReducer from "./slices_features/themeSlice";


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        theme: themeReducer
    }
});