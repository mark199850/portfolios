import type { IconName } from "../../system/iconRegistry";

interface BasePackageMeta {
  id: string;
  name: string;
}

export interface ApplicationPackageMeta extends BasePackageMeta {
  type: "application";
  iconName: IconName;
  isSingleton: boolean;
}

export interface ServicePackageMeta extends BasePackageMeta {
  type: "service";
}

export interface WidgetPackageMeta extends BasePackageMeta {
  type: "widget";
}

export type PackageMeta =
  | ApplicationPackageMeta
  | ServicePackageMeta
  | WidgetPackageMeta;
