import { AboutMe } from "../apps/AboutMe/AboutMe";
import type { IPackage } from "./interfaces/IPackage";
import { Settings } from "../apps/Settings/Settings";

export const hardDrive = {
  about: {
    id: "about",
    iconName: "ProfileIcon",
    name: "About",
    isBackgroundService: false,
    component: AboutMe,
  },
  settings: {
    id: "settings",
    iconName: "SettingsIcon",
    name: "Settings",
    isBackgroundService: false,
    component: Settings,
  },
} satisfies Record<string, IPackage>;

export const isValidPackage = (id: string): id is keyof typeof hardDrive => {
  return id in hardDrive;
};
