import { useSelector } from "react-redux";
import type { RootState } from "../../../core/context/OSStore";
import { ServiceSpawner } from "./ServiceSpawner";
import { memo } from "react";

export const ServiceStack = memo(function ServiceStack() {
  const backgroundProcesses = useSelector(
    (state: RootState) => state.process.backgroundIds,
  );

  return (
    <>
      {backgroundProcesses.map((pid) => {
        return <ServiceSpawner key={pid} pid={pid} />;
      })}
    </>
  );
});
