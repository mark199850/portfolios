import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RgbaColor } from "react-colorful";

type AppLayout = "pc" | "mobile";

type ThemeSliceState = {
  appLayout: AppLayout;
  accentColor: RgbaColor;
  secondaryColor: RgbaColor;
  tertiaryColor: RgbaColor;
  borderRadius: string;
  elementGap: string;
  windowBorderThickness: string;
  blurAmount: string;
};

const initialState: ThemeSliceState = {
  appLayout: "pc",
  accentColor: { r: 60, g: 75, b: 51, a: 1 },
  secondaryColor: { r: 0, g: 0, b: 0, a: 0.3 },
  tertiaryColor: { r: 0, g: 0, b: 0, a: 0.3 },
  borderRadius: "10px",
  elementGap: "5px",
  windowBorderThickness: "7px",
  blurAmount: "30px",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    switchAppLayout: (state, action: PayloadAction<{ layout: AppLayout }>) => {
      state.appLayout = action.payload.layout;
    },
    saveAccentColor: (state, action: PayloadAction<{ color: RgbaColor }>) => {
      state.accentColor = action.payload.color;
    },
    saveSecondaryColor: (
      state,
      action: PayloadAction<{ color: RgbaColor }>,
    ) => {
      state.secondaryColor = action.payload.color;
    },
    saveTertiaryColor: (state, action: PayloadAction<{ color: RgbaColor }>) => {
      state.tertiaryColor = action.payload.color;
    },

    saveBorderRadius: (
      state,
      action: PayloadAction<{ borderRadius: string }>,
    ) => {
      state.borderRadius = action.payload.borderRadius + "px";
    },
    saveElementGap: (state, action: PayloadAction<{ elementGap: string }>) => {
      state.elementGap = action.payload.elementGap + "px";
    },
    saveBorderWidth: (
      state,
      action: PayloadAction<{ windowBorderThickness: string }>,
    ) => {
      state.windowBorderThickness = action.payload.windowBorderThickness + "px";
    },
    saveBlurAmount: (state, action: PayloadAction<{ blurAmount: string }>) => {
      state.blurAmount = action.payload.blurAmount + "px";
    },
  },
});

export const {
  switchAppLayout,
  saveAccentColor,
  saveSecondaryColor,
  saveTertiaryColor,
  saveBorderRadius,
  saveElementGap,
  saveBorderWidth,
  saveBlurAmount,
} = themeSlice.actions;
export const themeSliceReducer = themeSlice.reducer;
