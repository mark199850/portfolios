import { useSelector } from "react-redux";
import {
  TabbedView,
  type AppTabs,
} from "../../components/shared/TabbedView/TabbedView";
import { Processes } from "./Processes";
import { RunningApps } from "./RunningApps";
import type { RootState } from "../../core/context/OSStore";
import { Services } from "./Services";
import { hardDrive } from "../../core/hardDrive";
import { useMemo } from "react";

export function SystemMonitor() {
  const processes = useSelector((state: RootState) => state.process.byId);

  const servicesArray = useMemo(() => {
    return Object.values(hardDrive).filter(
      (packageObj) => packageObj.isService === true,
    );
  }, []);

  const tabs = {
    Processes: <Processes processes={processes} />,
    "Running Apps": <RunningApps processes={processes} />,
    Services: <Services services={servicesArray} processes={processes} />,
  } satisfies AppTabs;

  return (
    <TabbedView
      defaultTab="Processes"
      tabs={tabs}
      customTabPanelStyle={true}
    ></TabbedView>
  );
}
