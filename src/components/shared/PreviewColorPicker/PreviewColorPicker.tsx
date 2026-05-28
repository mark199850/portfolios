import { useState } from "react";
import { RgbaColorPicker, type RgbaColor } from "react-colorful";

type PreviewColorPickerProps = {
  label: string;
  value: RgbaColor;
  onPreview: (color: RgbaColor) => void;
  onCommit: (color: RgbaColor) => void;
};

export function PreviewColorPicker({
  label,
  value,
  onPreview,
  onCommit,
}: PreviewColorPickerProps) {
  const [draftValue, setDraftValue] = useState<RgbaColor | null>(null);

  const activeValue = draftValue ?? value;

  return (
    <>
      <h2>{label}</h2>
      <RgbaColorPicker
        color={activeValue}
        onChange={(newValue) => {
          setDraftValue(newValue);
          onPreview(newValue);
        }}
        onChangeEnd={(newValue) => {
          onCommit(newValue);
          setDraftValue(null);
        }}
      />
    </>
  );
}
