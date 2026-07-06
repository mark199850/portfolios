import type { ElementType } from "react";
import { AboutMe } from "./AboutMe/AboutMe.tsx";
import { SystemMonitor } from "./SystemMonitor/SystemMonitor.tsx";
import { Settings } from "./Settings/Settings.tsx";
import type { AppId } from "../system/hardDriveMeta.ts";

export const applicationMap: Record<AppId, ElementType> = {
  about: AboutMe,
  settings: Settings,
  systemMonitor: SystemMonitor,
};

export const isValidApplication = (id: string): id is AppId => {
  return Object.hasOwn(applicationMap, id);
};
