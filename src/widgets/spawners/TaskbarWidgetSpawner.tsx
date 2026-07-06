import { memo } from "react";
import { isValidTaskbarWidget, widgetMap } from "../widgetRegistry";
import TaskbarWidgetWrapper from "../wrappers/TaskbarWidgetWrapper";
import type { WidgetId } from "../../system/hardDriveMeta";

type TaskbarWidgetSpawnerProps = {
  id: WidgetId;
};
export const TaskbarWidgetSpawner = memo(function TaskbarWidgetSpawner({
  id,
}: TaskbarWidgetSpawnerProps) {
  if (!isValidTaskbarWidget(id)) {
    console.warn(`Attempted to spawn widget with invalid id: ${id}`);
    return null;
  }
  const DisplayComponent = widgetMap.taskbar[id].display;
  const FloatingPopupComponent = widgetMap.taskbar[id].floatingPopup;

  return (
    <TaskbarWidgetWrapper
      Display={DisplayComponent}
      FloatingPopup={FloatingPopupComponent}
    />
  );
});
