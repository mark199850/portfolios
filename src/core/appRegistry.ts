import type { ElementType } from "react";
import { AboutMe } from "../apps/AboutMe/AboutMe";
import { SystemMonitor } from "../apps/SystemMonitor/SystemMonitor";
import { Settings } from "../apps/Settings/Settings";
import type { AppId } from "./hardDriveMeta.ts";

export const applicationMap: Record<AppId, ElementType> = {
  about: AboutMe,
  settings: Settings,
  systemMonitor: SystemMonitor,
};

export const isValidApplication = (id: string): id is AppId => {
  return id in applicationMap;
};
export type AppIconName = AppId;
