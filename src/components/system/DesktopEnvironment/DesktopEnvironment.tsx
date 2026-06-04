import { DesktopCanvas } from "../DesktopCanvas/DesktopCanvas";
import styles from "./DesktopEnvironment.module.scss";
import { useEffect } from "react";
import { useSystemCtl } from "../../../hooks/useSystemCtl";
import { ServiceManager } from "../ServiceManager/ServiceManager";

export function DesktopEnvironment() {
  const { startService } = useSystemCtl();

  useEffect(() => {
    startService("clockd");
  }, [startService]);

  return (
    <div className={styles.container}>
      <DesktopCanvas />
      <ServiceManager />
    </div>
  );
}
