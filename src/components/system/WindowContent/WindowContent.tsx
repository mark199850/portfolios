import { hardDrive, isValidPackage } from "../../../core/hardDrive";
import type { IWindow } from "../../../core/interfaces/IWindow";
import { useSelector } from "react-redux";
import type { RootState } from "../../../core/context/OSStore";
import styles from "./WindowContent.module.scss";

type WindowCOntentProps = {
  windowId: IWindow["id"];
};

export function WindowContent({ windowId }: WindowCOntentProps) {
  const packageId = useSelector((state: RootState) => {
    const windowData = state.window.byId[windowId];
    if (!windowData) return null;

    const processData = state.process.byId[windowData.processId];
    if (!processData) return null;

    return processData.packageId;
  });

  if (!packageId || !isValidPackage(packageId)) return null;

  const PackageComponent = hardDrive[packageId]?.component;

  return (
    <div className={styles.container}>
      {PackageComponent ? <PackageComponent /> : <p>Loading...</p>}
    </div>
  );
}
