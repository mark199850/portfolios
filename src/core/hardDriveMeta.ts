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
  return id in hardDriveMeta;
};

export type AppId = {
  [K in PackageId]: (typeof hardDriveMeta)[K]["type"] extends "application"
    ? K
    : never;
}[PackageId];

export type ServiceId = {
  [K in PackageId]: (typeof hardDriveMeta)[K]["type"] extends "service"
    ? K
    : never;
}[PackageId];

export type WidgetId = {
  [K in PackageId]: (typeof hardDriveMeta)[K]["type"] extends "widget"
    ? K
    : never;
}[PackageId];
