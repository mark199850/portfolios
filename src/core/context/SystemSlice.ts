import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ProcessSliceState = {
  time: number;
};
const initialState: ProcessSliceState = {
  time: Date.now(),
};
export const systemSlice = createSlice({
  name: "process",
  initialState,
  reducers: {
    setTime: (state, action: PayloadAction<{ time: number }>) => {
      state.time = action.payload.time;
    },
  },
});

export const { setTime } = systemSlice.actions;

export const systemSliceReducer = systemSlice.reducer;
