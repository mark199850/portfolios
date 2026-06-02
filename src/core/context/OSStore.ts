import { configureStore } from "@reduxjs/toolkit";
import { processSliceReducer } from "./ProcessSlice.ts";
import { windowSliceReducer } from "./WindowSlice.ts";
import { themeSliceReducer } from "./ThemeSlice.ts";
import { systemSliceReducer } from "./SystemSlice.ts";

export const store = configureStore({
  reducer: {
    window: windowSliceReducer,
    process: processSliceReducer,
    theme: themeSliceReducer,
    system: systemSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
