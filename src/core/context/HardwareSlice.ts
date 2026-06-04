import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type HardwareSliceState = {
  time: number;
};
const initialState: HardwareSliceState = {
  time: Date.now(),
};
export const hardwareSlice = createSlice({
  name: "process",
  initialState,
  reducers: {
    setTime: (state, action: PayloadAction<{ time: number }>) => {
      state.time = action.payload.time;
    },
  },
});

export const { setTime } = hardwareSlice.actions;

export const hardwareSliceReducer = hardwareSlice.reducer;
