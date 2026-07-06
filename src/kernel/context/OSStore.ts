import { configureStore } from "@reduxjs/toolkit";
import { processSliceReducer } from "./processSlice.ts";
import { windowSliceReducer } from "../../shell/Windowing/windowSlice.ts";
import { themeSliceReducer } from "../../shell/Theme/themeSlice.ts";
import { hardwareSliceReducer } from "./hardwareSlice.ts";
import { widgetSliceReducer } from "../../widgets/widgetSlice.ts";

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
