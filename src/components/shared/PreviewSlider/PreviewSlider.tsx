import { Slider } from "@base-ui/react";
import styles from "./PreviewSlider.module.scss";
import { useState } from "react";

type PreviewSliderProps = {
  label: string;
  value: number;
  onPreview: (value: number) => void;
  onCommit: (value: number) => void;
};

export function PreviewSlider({
  label,
  value,
  onPreview,
  onCommit,
}: PreviewSliderProps) {
  const [draftValue, setDraftValue] = useState<number | null>(null);
  const displayValue = draftValue ?? value;

  return (
    <>
      <h2>{label}</h2>
      <Slider.Root
        value={displayValue}
        onValueChange={(val) => {
          setDraftValue(val);
          onPreview(val);
        }}
        onValueCommitted={() => {
          if (draftValue !== null) {
            onCommit(draftValue);
            setDraftValue(null);
          }
        }}
      >
        <Slider.Control className={styles.sliderControl}>
          <Slider.Track className={styles.sliderTrack}>
            <Slider.Indicator className={styles.sliderIndicator} />
            <Slider.Thumb className={styles.sliderThumb} />
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>
      <span>{displayValue}</span>
    </>
  );
}
