import { DesktopCanvas } from "../DesktopCanvas/DesktopCanvas";
import styles from "./DesktopEnvironment.module.scss";

export function DesktopEnvironment() {
  return (
    <div className={styles.container}>
      <DesktopCanvas />
    </div>
  );
}
