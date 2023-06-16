import { configureStore } from "@reduxjs/toolkit";
import getIDs from "./getIDs";

export const store = configureStore({
    reducer: {
        getId : getIDs
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch