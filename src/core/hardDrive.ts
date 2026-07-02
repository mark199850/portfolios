import { AboutMe } from "../apps/AboutMe/AboutMe";
import type { IPackage } from "./interfaces/IPackage";
import { Settings } from "../apps/Settings/Settings";
import { Clockd } from "../services/Clockd/Clockd";
import { SystemMonitor } from "../apps/SystemMonitor/SystemMonitor";
//TODO: src/core/hardDrive.ts imports SystemMonitor, and src/apps/SystemMonitor/SystemMonitor.tsx imports hardDrive
//to derive servicesArray, creating a module cycle.
//Move the shared package metadata into a dependency-free module so both sides can import from it.
//

export const hardDrive = {
  about: {
    type: "application",
    id: "about",
    iconName: "ProfileIcon",
    name: "About",
    isSingleton: true,
    component: AboutMe,
  },
  settings: {
    type: "application",
    id: "settings",
    iconName: "SettingsIcon",
    name: "Settings",
    isSingleton: true,
    component: Settings,
  },
  clockd: {
    type: "service",
    id: "clockd",
    name: "clockd",
    isSingleton: true,
    component: Clockd,
  },
  systemMonitor: {
    type: "application",
    id: "systemMonitor",
    name: "System Monitor",
    iconName: "SystemMonitorIcon",
    isSingleton: true,
    component: SystemMonitor,
  },
} satisfies Record<string, IPackage>;

export const isValidPackage = (id: string): id is keyof typeof hardDrive => {
  return id in hardDrive;
};
