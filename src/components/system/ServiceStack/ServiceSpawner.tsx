import { useSelector } from "react-redux";
import { hardDrive, isValidPackage } from "../../../core/hardDrive";
import type { IProcess } from "../../../core/interfaces/IProcess";
import type { RootState } from "../../../core/context/OSStore";

type ServiceSpawnerProps = {
  pid: IProcess["pid"];
};

export function ServiceSpawner({ pid }: ServiceSpawnerProps) {
  const process = useSelector((state: RootState) => state.process.byId[pid]);

  if (!process || !isValidPackage(process?.packageId)) return null;
  if (hardDrive[process.packageId].isBackgroundService == false) return null;

  const Component = hardDrive[process.packageId].component;

  console.log("spawned: " + process.packageId);
  return <Component />;
}
