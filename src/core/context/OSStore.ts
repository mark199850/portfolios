import { configureStore } from "@reduxjs/toolkit";
import { processSliceReducer } from "./ProcessSlice.ts";
import { windowSliceReducer } from "./WindowSlice.ts";
import { themeSliceReducer } from "./ThemeSlice.ts";
import { hardwareSliceReducer } from "./HardwareSlice.ts";
import { widgetSliceReducer } from "./WidgetSlice.ts";

export const store = configureStore({
  reducer: {
    window: windowSliceReducer,
    process: processSliceReducer,
    theme: themeSliceReducer,
    hardware: hardwareSliceReducer,
    widget: widgetSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
