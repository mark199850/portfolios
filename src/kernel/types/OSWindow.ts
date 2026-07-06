import type { ApplicationPackageMeta } from "./PackageMeta";
import type { OSProcess } from "./OSProcess";

export interface OSWindow {
  id: string;
  pid: OSProcess["pid"];
  title: ApplicationPackageMeta["name"];
  iconName: ApplicationPackageMeta["iconName"];
  position: { x: number; y: number };
  size: { x: number | string; y: number | string };
  sizingMode: "small" | "maximized";
  isMinimized: boolean;
  isClosing: boolean;
  zIndex: number;
}
