import { useSelector } from "react-redux";
import type { RootState } from "../../core/context/OSStore";

type UptimeCellProps = {
  startTimestamp: number;
};

export const UptimeCell = ({ startTimestamp }: UptimeCellProps) => {
  const sysTime = useSelector((state: RootState) => state.hardware.time);

  return (
    <span>
      {new Date(sysTime - startTimestamp).toLocaleTimeString("en-GB", {
        timeZone: "UTC",
      })}
    </span>
  );
};
