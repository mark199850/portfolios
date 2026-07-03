import type { ElementType } from "react";
import { Clockd } from "../services/Clockd/Clockd";
import type { ServiceId } from "./hardDriveMeta.ts";

export const serviceMap: Record<ServiceId, ElementType> = {
  clockd: Clockd,
};
export const isValidService = (id: string): id is ServiceId => {
  return id in serviceMap;
};
