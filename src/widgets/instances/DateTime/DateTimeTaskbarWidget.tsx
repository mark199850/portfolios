import { useSelector } from "react-redux";
import type { RootState } from "../../../kernel/context/OSStore";

export function DateTimeTaskbarWidget() {
  const systemTime = useSelector((state: RootState) => state.hardware.time);
  const d = new Date(systemTime);
  const time = d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = d.toLocaleDateString("en-GB");

  return (
    <>
      <div>{time}</div>
      <div>{date}</div>
    </>
  );
}
