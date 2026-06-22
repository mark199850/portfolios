import { AboutMe } from "../apps/AboutMe/AboutMe";
import type { IPackage } from "./interfaces/IPackage";
import { Settings } from "../apps/Settings/Settings";
import { Clockd } from "../services/Clockd/Clockd";
import { SystemMonitor } from "../apps/SystemMonitor/SystemMonitor";

export const hardDrive = {
  about: {
    id: "about",
    iconName: "ProfileIcon",
    name: "About",
    isBackground: false,
    isSingleton: true,
    isService: false,
    component: AboutMe,
  },
  settings: {
    id: "settings",
    iconName: "SettingsIcon",
    name: "Settings",
    isBackground: false,
    isService: false,
    isSingleton: true,
    component: Settings,
  },
  clockd: {
    id: "clockd",
    name: "clockd",
    isBackground: true,
    isService: true,
    isSingleton: true,
    component: Clockd,
  },
  systemMonitor: {
    id: "systemMonitor",
    name: "System Monitor",
    iconName: "SystemMonitorIcon",
    isBackground: false,
    isService: false,
    isSingleton: true,
    component: SystemMonitor,
  },
} satisfies Record<string, IPackage>;

export const isValidPackage = (id: string): id is keyof typeof hardDrive => {
  return id in hardDrive;
};
