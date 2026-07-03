import type { IPackage } from "./interfaces/IPackage";

export const hardDriveMeta = {
  about: {
    type: "application",
    id: "about",
    iconName: "ProfileIcon",
    name: "About",
    isSingleton: true,
  },
  settings: {
    type: "application",
    id: "settings",
    iconName: "SettingsIcon",
    name: "Settings",
    isSingleton: true,
  },
  clockd: {
    type: "service",
    id: "clockd",
    name: "clockd",
  },
  systemMonitor: {
    type: "application",
    id: "systemMonitor",
    name: "System Monitor",
    iconName: "SystemMonitorIcon",
    isSingleton: true,
  },
  dateTime: {
    type: "widget",
    id: "dateTime",
    name: "DateTime Widget",
  },
} as const satisfies Record<string, IPackage>;

export type PackageId = keyof typeof hardDriveMeta;

export const isValidPackage = (id: string): id is PackageId => {
  return Object.hasOwn(hardDriveMeta, id);
};

type PackageIdOfType<T extends IPackage["type"]> = {
  [K in PackageId]: (typeof hardDriveMeta)[K]["type"] extends T ? K : never;
}[PackageId];

export type AppId = PackageIdOfType<"application">;
export type ServiceId = PackageIdOfType<"service">;
export type WidgetId = PackageIdOfType<"widget">;
