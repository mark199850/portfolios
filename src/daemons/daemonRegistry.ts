import type { ElementType } from "react";
import { Clockd } from "./Clockd/Clockd.tsx";
import type { ServiceId } from "../system/hardDriveMeta.ts";

export const daemonMap: Record<ServiceId, ElementType> = {
  clockd: Clockd,
};
export const isValidService = (id: string): id is ServiceId => {
  return Object.hasOwn(daemonMap, id);
};
