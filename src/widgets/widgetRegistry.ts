import { DateTimeFullSizeWidget } from "./instances/DateTime/DateTimeFullSizeWidget";
import { DateTimeTaskbarWidget } from "./instances/DateTime/DateTimeTaskbarWidget";
import type { WidgetId } from "../system/hardDriveMeta";

type TaskbarWidget = {
  display: React.ElementType;
  floatingPopup: React.ElementType;
};

type WidgetRegistry = {
  taskbar: Record<WidgetId, TaskbarWidget>;
  fullSize: Record<WidgetId, React.ElementType>;
};

export const widgetMap = {
  taskbar: {
    dateTime: {
      display: DateTimeTaskbarWidget,
      floatingPopup: DateTimeFullSizeWidget,
    },
  },
  fullSize: {
    dateTime: DateTimeFullSizeWidget,
  },
} satisfies WidgetRegistry;

export const isValidTaskbarWidget = (id: string): id is WidgetId => {
  return Object.hasOwn(widgetMap.taskbar, id);
};

export const isValidFullSizeWidget = (id: string): id is WidgetId => {
  return Object.hasOwn(widgetMap.fullSize, id);
};
