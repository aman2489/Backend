import {configureStore} from "@reduxjs/toolkit";
import { authSlice } from "../state/Authreducer";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },

})
