import { DateTimeFullSizeWidget } from "../widgets/DateTime/DateTimeFullSizeWidget";
import { DateTimeTaskbarWidget } from "../widgets/DateTime/DateTimeTaskbarWidget";
import type { WidgetId } from "./hardDriveMeta";

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
  return id in widgetMap.taskbar;
};

export const isValidDullSizeWidget = (id: string): id is WidgetId => {
  return id in widgetMap.fullSize;
};
