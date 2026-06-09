import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type {
  DesktopWidgetName,
  TaskbarWidgetName,
} from "../types/WidgetTypes";

type DesktopWidgetInstanceProps = {
  widgetId: DesktopWidgetName;
  x: number;
  y: number;
};

type TaskbarWidgetInstanceProps = {
  widgetId: TaskbarWidgetName;
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

function generateWidgetId(
  widgetName: TaskbarWidgetName | DesktopWidgetName,
): string {
  return `${widgetName}_${nanoid(6)}`;
}

export const widgetSlice = createSlice({
  name: "widget",
  initialState,
  reducers: {
    addWidgetToTaskbar: (
      state,
      action: PayloadAction<{ widgetName: TaskbarWidgetName }>,
    ) => {
      const { widgetName } = action.payload;
      const instanceId = generateWidgetId(widgetName);
      state.taskbarIds.push(instanceId);

      state.taskbarById[instanceId] = { widgetId: widgetName };
    },
    addWidgetToDesktop: (
      state,
      action: PayloadAction<{ widgetName: DesktopWidgetName }>,
    ) => {
      const { widgetName } = action.payload;
      const instanceId = generateWidgetId(widgetName);
      state.desktopIds.push(instanceId);

      state.desktopById[instanceId] = {
        widgetId: widgetName,
        x: 100,
        y: 50,
      };
    },
  },
});

export const { addWidgetToTaskbar } = widgetSlice.actions;

export const widgetSliceReducer = widgetSlice.reducer;
