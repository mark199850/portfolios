import type { ProcessId } from "../utils/pid";

export interface IProcess {
  pid: ProcessId;
  packageId: string;
  isBackground: boolean;
}
