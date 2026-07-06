import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OSWindow } from "../../kernel/types/OSWindow";

type WindowSliceState = {
  byId: Record<OSWindow["id"], OSWindow>;
  allIds: OSWindow["id"][];
  highestZIndex: number;
  focusedWindowId: OSWindow["id"];
};
const initialState: WindowSliceState = {
  byId: {},
  allIds: [],
  highestZIndex: 0,
  focusedWindowId: "",
};

const recalculateZIndex = (state: WindowSliceState) => {
  let recalculatedHighestZIndex: OSWindow["zIndex"] = -1;
  let highestZIndexWindowId: OSWindow["id"] = "";

  state.allIds.forEach((id) => {
    const win = state.byId[id];
    if (win && win.zIndex > recalculatedHighestZIndex && !win.isMinimized) {
      recalculatedHighestZIndex = win.zIndex;
      highestZIndexWindowId = win.id;
    }
  });

  state.focusedWindowId = highestZIndexWindowId;
};

const updateWindowById = <K extends keyof OSWindow>(
  state: WindowSliceState,
  id: OSWindow["id"],
  changes: Pick<OSWindow, K>,
) => {
  const window = state.byId[id];
  if (!window) return;
  state.byId[id] = { ...window, ...changes };
};

const windowSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
    addWindow: (state, action: PayloadAction<OSWindow>) => {
      const window = action.payload;
      state.highestZIndex += 1;
      state.byId[window.id] = {
        ...window,
        zIndex: state.highestZIndex,
      };
      state.allIds.push(window.id);
      state.focusedWindowId = window.id;
    },

    removeWindow: (state, action: PayloadAction<OSWindow["id"]>) => {
      const windowId = action.payload;
      delete state.byId[windowId];
      state.allIds = state.allIds.filter((id) => id !== windowId);
      if (state.focusedWindowId === windowId) {
        recalculateZIndex(state);
      }
    },

    bringWindowToTop: (state, action: PayloadAction<OSWindow["id"]>) => {
      const id = action.payload;

      const window = state.byId[id];
      if (window && window.zIndex < state.highestZIndex) {
        window.zIndex = state.highestZIndex + 1;
        state.highestZIndex += 1;
      }
      if (window && state.focusedWindowId !== window.id) {
        state.focusedWindowId = window.id;
      }
    },

    setWindowPosition: (
      state,
      action: PayloadAction<Pick<OSWindow, "id" | "position">>,
    ) => {
      const { id, position } = action.payload;
      updateWindowById(state, id, { position });
    },

    setWindowSize: (
      state,
      action: PayloadAction<Pick<OSWindow, "id" | "size">>,
    ) => {
      const { id, size } = action.payload;
      updateWindowById(state, id, { size });
    },

    setWindowSizingMode: (
      state,
      action: PayloadAction<Pick<OSWindow, "id" | "sizingMode">>,
    ) => {
      const { id, sizingMode } = action.payload;
      updateWindowById(state, id, { sizingMode });
    },

    markWindowAsClosing: (
      state,
      action: PayloadAction<Pick<OSWindow, "id" | "isClosing">>,
    ) => {
      const { id, isClosing } = action.payload;
      updateWindowById(state, id, { isClosing });
    },

    minimizeWindow: (state, action: PayloadAction<OSWindow["id"]>) => {
      const id = action.payload;
      if (state.byId[id]) {
        state.byId[id] = { ...state.byId[id], isMinimized: true, zIndex: 0 };
      }
      recalculateZIndex(state);
    },

    unMinimizeWindow: (state, action: PayloadAction<OSWindow["id"]>) => {
      const id = action.payload;
      const window = state.byId[id];
      if (window) {
        state.highestZIndex += 1;
        state.byId[id] = {
          ...window,
          isMinimized: false,
          zIndex: state.highestZIndex,
        };
        state.focusedWindowId = id;
      }
    },
  },
});

export const {
  addWindow,
  removeWindow,
  bringWindowToTop,
  setWindowPosition,
  setWindowSize,
  setWindowSizingMode,
  markWindowAsClosing,
  minimizeWindow,
  unMinimizeWindow,
} = windowSlice.actions;

export const windowSliceReducer = windowSlice.reducer;
