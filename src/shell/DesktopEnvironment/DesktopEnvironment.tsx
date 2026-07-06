import { DesktopCanvas } from "../DesktopCanvas/DesktopCanvas";
import styles from "./DesktopEnvironment.module.scss";
import { useEffect } from "react";
import { addWidgetToTaskbar } from "../../widgets/widgetSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../kernel/context/OSStore";

export function DesktopEnvironment() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(addWidgetToTaskbar({ widgetId: "dateTime" }));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <DesktopCanvas />
    </div>
  );
}
