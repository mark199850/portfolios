import { useSelector } from "react-redux";
import type { RootState } from "../../kernel/context/OSStore";
import { DaemonSpawner } from "./DaemonSpawner";
import { memo, useEffect } from "react";
import { useSystemCtl } from "../hooks/useSystemCtl";

export const InitSystem = memo(function InitSystem() {
  const backgroundProcesses = useSelector(
    (state: RootState) => state.process.backgroundIds,
  );
  const { startService } = useSystemCtl();

  useEffect(() => {
    startService("clockd");
  }, [startService]);

  return (
    <>
      {backgroundProcesses.map((pid) => {
        return <DaemonSpawner key={pid} pid={pid} />;
      })}
    </>
  );
});
