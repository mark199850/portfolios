import { DateTimeFullSizeWidget } from "../widgets/DateTime/DateTimeFullSizeWidget";
import { DateTimeTaskbarWidget } from "../widgets/DateTime/DateTimeTaskbarWidget";
import type { DesktopWidgetName, TaskbarWidgetName } from "./types/WidgetTypes";

type TaskbarWidget = {
  display: React.ElementType;
  floatingPopup: React.ElementType;
};

type WidgetRegistry = {
  taskbar?: Record<TaskbarWidgetName, TaskbarWidget>;
  desktop?: Record<DesktopWidgetName, React.ElementType>;
};

export const widgetRegistry = {
  taskbar: {
    clock: {
      display: DateTimeTaskbarWidget,
      floatingPopup: DateTimeFullSizeWidget,
    },
  },
} satisfies WidgetRegistry;
