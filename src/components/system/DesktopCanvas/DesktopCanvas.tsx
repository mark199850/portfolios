import { PackageShortcut } from "../PackageShortcut/PackageShortcut";
import { WindowStack } from "../WindowStack/WindowStack";
import styles from "./DesktopCanvas.module.scss";
import aboutIcon from "../../../assets/profile.png";
import terminalIcon from "../../../assets/terminal.png";
import { Taskbar } from "../Taskbar";

export function DesktopCanvas() {
  return (
    <div className={styles.container}>
      <PackageShortcut icon={aboutIcon} packageId="about" />
      <PackageShortcut icon={terminalIcon} packageId="terminal" />
      <WindowStack />
      <Taskbar />
    </div>
  );
}
