import { useSelector } from "react-redux";
import type { IProcess } from "../../../core/interfaces/IProcess";
import type { RootState } from "../../../core/context/OSStore";
import { memo } from "react";
import { isValidService, serviceMap } from "../../../core/serviceRegistry";

type ServiceSpawnerProps = {
  pid: IProcess["pid"];
};

export const ServiceSpawner = memo(function ServiceSpawner({
  pid,
}: ServiceSpawnerProps) {
  const process = useSelector((state: RootState) => state.process.byId[pid]);

  if (!process) return null;
  if (!isValidService(process.packageId)) return null;

  const Component = serviceMap[process.packageId];

  return <Component />;
});
