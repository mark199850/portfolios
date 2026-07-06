import { hardDriveMeta, isValidPackage } from "../../../system/hardDriveMeta";
import { useSelector } from "react-redux";
import type { RootState } from "../../../kernel/context/OSStore";
import styles from "./WindowContent.module.scss";
import { applicationMap, isValidApplication } from "../../../apps/appRegistry";
import type { OSWindow } from "../../../kernel/types/OSWindow";

type WindowCOntentProps = {
  windowId: OSWindow["id"];
};

export function WindowContent({ windowId }: WindowCOntentProps) {
  const packageId = useSelector((state: RootState) => {
    const windowData = state.window.byId[windowId];
    if (!windowData) return null;

    const processData = state.process.byId[windowData.pid];
    if (!processData) return null;

    return processData.packageId;
  });

  if (!packageId || !isValidPackage(packageId)) return null;

  const pkg = hardDriveMeta[packageId];

  if (!isValidApplication(pkg.id)) {
    console.warn(`Attempted to render ${pkg.type} '${packageId}' in a window.`);
    return null;
  }

  const PackageComponent = applicationMap[pkg.id];

  return (
    <div className={styles.container}>
      <PackageComponent />
    </div>
  );
}
