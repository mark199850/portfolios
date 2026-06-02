import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProcess } from "../interfaces/IProcess";
import type { IPackage } from "../interfaces/IPackage";

type ProcessSliceState = {
  byId: Record<IProcess["pid"], IProcess>;
  allIds: IProcess["pid"][];
};
const initialState: ProcessSliceState = {
  byId: {},
  allIds: [],
};
export const processSlice = createSlice({
  name: "process",
  initialState,
  reducers: {
    spawnProcess: (
      state,
      action: PayloadAction<{
        packageId: IPackage["id"];
        pid: IProcess["pid"];
        isBackground: IProcess["isBackground"];
      }>,
    ) => {
      const { packageId, pid, isBackground } = action.payload;

      state.byId[pid] = {
        packageId,
        pid,
        isBackground,
      };
      state.allIds.push(pid);
    },
    killProcess: (state, action: PayloadAction<IProcess["pid"]>) => {
      const processId = action.payload;

      const process = state.byId[processId];
      if (process) {
        delete state.byId[processId];
        state.allIds = state.allIds.filter((id) => id !== action.payload);
        return;
      }
      console.warn(`process ${processId} not found`);
    },
  },
});

export const { spawnProcess, killProcess } = processSlice.actions;

export const processSliceReducer = processSlice.reducer;
