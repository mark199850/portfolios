import { useSelector } from "react-redux";
import type { RootState } from "../../../core/context/OSStore";
import { ServiceSpawner } from "./ServiceSpawner";

export function ServiceManager() {
  const backgroundProcesses = useSelector(
    (state: RootState) => state.process.backgroundIds,
  );
  console.log("manager sees the following processes: " + backgroundProcesses);
  return (
    <>
      {backgroundProcesses.map((pid) => {
        return <ServiceSpawner key={pid} pid={pid} />;
      })}
    </>
  );
}
