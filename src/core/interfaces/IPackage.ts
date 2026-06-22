import type { ElementType } from "react";
import type { IconName } from "../iconRegistry";

export interface IPackage {
  id: string;
  name: string;
  iconName?: IconName;
  isBackground: boolean;
  isService: boolean;
  isSingleton: boolean;
  component: ElementType;
  daemons?: string[];
}
