import type { IApplicationPackage } from "./IPackage";
import type { IProcess } from "./IProcess";

export interface IWindow {
  id: string;
  pid: IProcess["pid"];
  title: IApplicationPackage["name"];
  iconName: IApplicationPackage["iconName"];
  position: { x: number; y: number };
  size: { x: number | string; y: number | string };
  sizingMode: "small" | "maximized";
  isMinimized: boolean;
  isClosing: boolean;
  zIndex: number;
}
