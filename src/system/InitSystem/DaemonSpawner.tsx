import { useSelector } from "react-redux";
import type { OSProcess } from "../../kernel/types/OSProcess";
import type { RootState } from "../../kernel/context/OSStore";
import { memo } from "react";
import { isValidService, daemonMap } from "../../daemons/daemonRegistry";

type ServiceSpawnerProps = {
  pid: OSProcess["pid"];
};

export const DaemonSpawner = memo(function DaemonSpawner({
  pid,
}: ServiceSpawnerProps) {
  const process = useSelector((state: RootState) => state.process.byId[pid]);

  if (!process) return null;
  if (!isValidService(process.packageId)) return null;

  const Component = daemonMap[process.packageId];

  return <Component />;
});
