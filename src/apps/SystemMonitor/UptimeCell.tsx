import { useSelector } from "react-redux";
import type { RootState } from "../../core/context/OSStore";

type UptimeCellProps = {
  startTimestamp: number;
};

function formatElapsedTime(startms: number, currentms: number) {
  const elapsed = currentms - startms;

  const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
  const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((elapsed / 1000 / 60) % 60);
  const seconds = Math.floor((elapsed / 1000) % 60);

  const pad = (num: number) => String(num).padStart(2, "0");

  return `${days}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export const UptimeCell = ({ startTimestamp }: UptimeCellProps) => {
  const sysTime = useSelector((state: RootState) => state.hardware.time);
  return <span>{formatElapsedTime(startTimestamp, sysTime)}</span>;
};
