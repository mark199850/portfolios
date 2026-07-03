import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { WidgetId } from "../hardDriveMeta";

type DesktopWidgetInstanceProps = {
  widgetId: WidgetId;
  x: number;
  y: number;
};

type TaskbarWidgetInstanceProps = {
  widgetId: WidgetId;
};

type InstanceId = string;

type WidgetSliceState = {
  taskbarById: Record<InstanceId, TaskbarWidgetInstanceProps>;
  desktopById: Record<InstanceId, DesktopWidgetInstanceProps>;
  taskbarIds: InstanceId[];
  desktopIds: InstanceId[];
};
const initialState: WidgetSliceState = {
  taskbarById: {},
  desktopById: {},
  taskbarIds: [],
  desktopIds: [],
};

function generateWidgetId(widgetId: WidgetId): string {
  return `${widgetId}_${nanoid(6)}`;
}

export const widgetSlice = createSlice({
  name: "widget",
  initialState,
  reducers: {
    addWidgetToTaskbar: (
      state,
      action: PayloadAction<{ widgetId: WidgetId }>,
    ) => {
      const { widgetId } = action.payload;
      const instanceId = generateWidgetId(widgetId);
      state.taskbarIds.push(instanceId);

      state.taskbarById[instanceId] = { widgetId: widgetId };
    },
    addWidgetToDesktop: (
      state,
      action: PayloadAction<{ widgetId: WidgetId }>,
    ) => {
      const { widgetId } = action.payload;
      const instanceId = generateWidgetId(widgetId);
      state.desktopIds.push(instanceId);

      state.desktopById[instanceId] = {
        widgetId: widgetId,
        x: 100,
        y: 50,
      };
    },
  },
});

export const { addWidgetToTaskbar } = widgetSlice.actions;

export const widgetSliceReducer = widgetSlice.reducer;
