import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProcess } from "../interfaces/IProcess";

type ProcessSliceState = {
  byId: Record<IProcess["pid"], IProcess>;
  foregroundIds: IProcess["pid"][];
  backgroundIds: IProcess["pid"][];
};
const initialState: ProcessSliceState = {
  byId: {},
  backgroundIds: [],
  foregroundIds: [],
};
export const processSlice = createSlice({
  name: "process",
  initialState,
  reducers: {
    spawnProcess: (state, action: PayloadAction<IProcess>) => {
      const { packageId, pid, isBackground, startTimestamp } = action.payload;

      state.byId[pid] = {
        packageId,
        pid,
        isBackground,
        startTimestamp,
      };
      if (isBackground) {
        state.backgroundIds.push(pid);
        return;
      }
      state.foregroundIds.push(pid);
    },
    killProcess: (state, action: PayloadAction<IProcess["pid"]>) => {
      const processId = action.payload;

      const process = state.byId[processId];
      if (!process) {
        console.warn(`process ${processId} not found`);
        return;
      }

      delete state.byId[processId];

      if (process.isBackground) {
        state.backgroundIds = state.backgroundIds.filter(
          (id) => id !== action.payload,
        );
        return;
      }

      state.foregroundIds = state.foregroundIds.filter(
        (id) => id !== action.payload,
      );
    },
  },
});

export const { spawnProcess, killProcess } = processSlice.actions;

export const processSliceReducer = processSlice.reducer;
