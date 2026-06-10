import { memo } from "react";
import { widgetRegistry } from "../../../core/WidgetRegistry";
import TaskbarWidgetWrapper from "../../shared/Widget/TaskbarWidgetWrapper";
import type { TaskbarWidgetName } from "../../../core/types/WidgetTypes";

type TaskbarWidgetSpawnerProps = {
  id: TaskbarWidgetName;
};
export const TaskbarWidgetSpawner = memo(function TaskbarWidgetSpawner({
  id,
}: TaskbarWidgetSpawnerProps) {
  const DisplayComponent = widgetRegistry.taskbar[id].display;
  const FloatingPopupComponent = widgetRegistry.taskbar[id].floatingPopup;

  return (
    <TaskbarWidgetWrapper
      Display={DisplayComponent}
      FloatingPopup={FloatingPopupComponent}
    />
  );
});
