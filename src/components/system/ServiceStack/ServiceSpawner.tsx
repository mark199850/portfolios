import { useSelector } from "react-redux";
import { hardDrive, isValidPackage } from "../../../core/hardDrive";
import type { IProcess } from "../../../core/interfaces/IProcess";
import type { RootState } from "../../../core/context/OSStore";
import { memo } from "react";

type ServiceSpawnerProps = {
  pid: IProcess["pid"];
};

export const ServiceSpawner = memo(function ServiceSpawner({
  pid,
}: ServiceSpawnerProps) {
  const process = useSelector((state: RootState) => state.process.byId[pid]);

  if (!process || !isValidPackage(process?.packageId)) return null;
  if (!hardDrive[process.packageId].isBackground) return null;

  const Component = hardDrive[process.packageId].component;

  return <Component />;
});
