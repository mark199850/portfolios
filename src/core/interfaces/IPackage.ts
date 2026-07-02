import type { FunctionComponent } from "react";
import type { IconName } from "../iconRegistry";

interface IBasePackage {
  id: string;
  name: string;
}

export interface IApplicationPackage extends IBasePackage {
  type: "application";
  iconName: IconName;
  isSingleton: boolean;
  component: React.ComponentType<FunctionComponent>;
}

export interface IServicePackage extends IBasePackage {
  type: "service";
  isSingleton: true;
  component: React.ComponentType<FunctionComponent>;
}

export interface IWidgetPackage extends IBasePackage {
  type: "widget";
  views: {
    taskbar: React.ComponentType<FunctionComponent>;
    popover: React.ComponentType<FunctionComponent>;
    desktop: React.ComponentType<FunctionComponent>;
  };
}

export type IPackage = IApplicationPackage | IServicePackage | IWidgetPackage;
