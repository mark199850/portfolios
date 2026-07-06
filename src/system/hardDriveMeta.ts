import type { PackageMeta } from "../kernel/types/PackageMeta";

const defineRegistry = <T extends Record<string, PackageMeta>>(registry: {
  [K in keyof T]: T[K] & { id: K };
}) => registry;

export const hardDriveMeta = defineRegistry({
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
    name: "System Clock Service",
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
} as const);

export type PackageId = keyof typeof hardDriveMeta;

export const isValidPackage = (id: string): id is PackageId => {
  return Object.hasOwn(hardDriveMeta, id);
};

type PackageIdOfType<T extends PackageMeta["type"]> = {
  [K in PackageId]: (typeof hardDriveMeta)[K]["type"] extends T ? K : never;
}[PackageId];

export type AppId = PackageIdOfType<"application">;
export type ServiceId = PackageIdOfType<"service">;
export type WidgetId = PackageIdOfType<"widget">;
