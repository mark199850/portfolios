import { AboutMe } from "../apps/AboutMe/AboutMe";
import type { IPackage } from "./interfaces/IPackage";
import { Settings } from "../apps/Settings/Settings";
import { Clockd } from "../services/Clockd/Clockd";

export const hardDrive = {
  about: {
    id: "about",
    iconName: "ProfileIcon",
    name: "About",
    isBackgroundService: false,
    isSingleton: true,
    component: AboutMe,
  },
  settings: {
    id: "settings",
    iconName: "SettingsIcon",
    name: "Settings",
    isBackgroundService: false,
    isSingleton: true,
    component: Settings,
  },
  clockd: {
    id: "clockd",
    name: "clockd",
    isBackgroundService: true,
    isSingleton: true,
    component: Clockd,
  },
} satisfies Record<string, IPackage>;

export const isValidPackage = (id: string): id is keyof typeof hardDrive => {
  return id in hardDrive;
};
