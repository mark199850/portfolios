import type { ProcessId } from "../utils/pid";

export interface OSProcess {
  pid: ProcessId;
  packageId: string;
  isBackground: boolean;
  startTimestamp: number;
}
