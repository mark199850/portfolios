import { DesktopCanvas } from "../DesktopCanvas/DesktopCanvas";
import styles from "./DesktopEnvironment.module.scss";
import { useEffect } from "react";
import { useSystemCtl } from "../../../hooks/useSystemCtl";
import { ServiceStack } from "../ServiceStack/ServiceStack";
import { addWidgetToTaskbar } from "../../../core/context/WidgetSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../core/context/OSStore";

export function DesktopEnvironment() {
  const { startService } = useSystemCtl();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    startService("clockd");
    dispatch(addWidgetToTaskbar({ widgetId: "dateTime" }));
  }, [startService, dispatch]);

  return (
    <div className={styles.container}>
      <DesktopCanvas />
      <ServiceStack />
    </div>
  );
}
