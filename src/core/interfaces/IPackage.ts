import type { IconName } from "../iconRegistry";

interface IBasePackage {
  id: string;
  name: string;
}

export interface IApplicationPackage extends IBasePackage {
  type: "application";
  iconName: IconName;
  isSingleton: boolean;
}

export interface IServicePackage extends IBasePackage {
  type: "service";
}

export interface IWidgetPackage extends IBasePackage {
  type: "widget";
}

export type IPackage = IApplicationPackage | IServicePackage | IWidgetPackage;
