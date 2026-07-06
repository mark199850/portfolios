import { useSelector } from "react-redux";
import type { RootState } from "../../../kernel/context/OSStore";
import { DayPicker } from "react-day-picker";
import { useState } from "react";
import classNames from "@daypicker/react/style.module.css";
import styles from "./DateTimeFullSizeWidget.module.scss";
import { memo } from "react";

export const TimeLabel = memo(function TimeLabel() {
  const hardwareTime = useSelector((state: RootState) => state.hardware.time);
  const formattedTime = new Date(hardwareTime).toLocaleTimeString("en-GB");

  return <div className={styles.clock}>{formattedTime}</div>;
});

export function DateTimeFullSizeWidget() {
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  return (
    <div className={styles.container}>
      <TimeLabel />
      <DayPicker
        animate
        className={styles.dayPicker}
        classNames={classNames}
        mode="single"
        selected={selected}
        onSelect={setSelected}
        modifiersClassNames={{}}
      />
    </div>
  );
}
