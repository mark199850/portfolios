import { useSelector } from "react-redux";
import type { RootState } from "../../kernel/context/OSStore";
import { TaskbarWidgetSpawner } from "../../widgets/spawners/TaskbarWidgetSpawner";
import { memo } from "react";

export const TaskbarWidgetArea = memo(function TaskbarWidgetArea() {
  const taskbarWidgetInstances = useSelector(
    (state: RootState) => state.widget.taskbarById,
  );

  return Object.entries(taskbarWidgetInstances).map(
    ([instanceId, instance]) => {
      return <TaskbarWidgetSpawner key={instanceId} id={instance.widgetId} />;
    },
  );
});
