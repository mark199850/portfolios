import { useWindowManager } from "../../hooks/useWindowManager";
import styles from "./Theme.module.scss";
import { PreviewSlider } from "../../components/shared/PreviewSlider/PreviewSlider";
import { PreviewColorPicker } from "../../components/shared/PreviewColorPicker/PreviewColorPicker";
export function Theme() {
  const { themeState, executeThemeAction, previewTheme } = useWindowManager();

  return (
    <ul className={styles.verticalSectionList}>
      <li className={styles.section}>
        <h1 className={styles.sectionLabel}>Colors</h1>
        <ul className={styles.horizontalSectionList}>
          <li className={styles.section}>
            <PreviewColorPicker
              value={themeState.accentColor}
              label="Accent"
              onPreview={(value) => {
                previewTheme({ type: "SET_ACCENT_COLOR", value });
              }}
              onCommit={(value) => {
                executeThemeAction({ type: "SET_ACCENT_COLOR", value });
              }}
            />
          </li>
          <li className={styles.section}>
            <PreviewColorPicker
              value={themeState.secondaryColor}
              label="Secondary"
              onPreview={(value) => {
                previewTheme({ type: "SET_SECONDARY_COLOR", value });
              }}
              onCommit={(value) => {
                executeThemeAction({ type: "SET_SECONDARY_COLOR", value });
              }}
            />
          </li>
          <li className={styles.section}>
            <PreviewColorPicker
              value={themeState.tertiaryColor}
              label="Tertiary"
              onPreview={(value) => {
                previewTheme({ type: "SET_TERTIARY_COLOR", value });
              }}
              onCommit={(value) => {
                executeThemeAction({ type: "SET_TERTIARY_COLOR", value });
              }}
            />
          </li>
        </ul>
      </li>
      <li className={styles.section}>
        <h1 className={styles.sectionLabel}>Dimensions</h1>
        <ul className={styles.verticalSectionList}>
          <li className={styles.section}>
            <PreviewSlider
              label="Border Radius"
              value={themeState.borderRadius}
              onPreview={(value) => {
                previewTheme({ type: "SET_BORDER_RADIUS", value });
              }}
              onCommit={(value) => {
                executeThemeAction({ type: "SET_BORDER_RADIUS", value });
              }}
            ></PreviewSlider>
          </li>
          <li className={styles.section}>
            <PreviewSlider
              label="Element Gap"
              value={themeState.elementGap}
              onPreview={(value) => {
                previewTheme({ type: "SET_ELEMENT_GAP", value });
              }}
              onCommit={(value) => {
                executeThemeAction({ type: "SET_ELEMENT_GAP", value });
              }}
            ></PreviewSlider>
          </li>
          <li className={styles.section}>
            <PreviewSlider
              label="Window Border Width"
              value={themeState.windowBorderThickness}
              onPreview={(value) => {
                previewTheme({ type: "SET_WINDOW_BORDER_THICKNESS", value });
              }}
              onCommit={(value) => {
                executeThemeAction({
                  type: "SET_WINDOW_BORDER_THICKNESS",
                  value,
                });
              }}
            ></PreviewSlider>
          </li>
          <li className={styles.section}>
            <PreviewSlider
              label="Blur Amount"
              value={themeState.blurAmount}
              onPreview={(value) => {
                previewTheme({ type: "SET_BLUR_AMOUNT", value });
              }}
              onCommit={(value) => {
                executeThemeAction({ type: "SET_BLUR_AMOUNT", value });
              }}
            ></PreviewSlider>
          </li>
        </ul>
        <li className={styles.section}>
          <h1 className={styles.sectionLabel}>Layout</h1>
          <ul className={styles.verticalSectionList}>
            <li className={styles.section}>
              <PreviewSlider
                label="Compact tab threshold"
                max={1000}
                value={themeState.compactWidth}
                onPreview={(value) => {
                  previewTheme({ type: "SET_COMPACT_WIDTH", value });
                }}
                onCommit={(value) => {
                  executeThemeAction({ type: "SET_COMPACT_WIDTH", value });
                }}
              ></PreviewSlider>
            </li>
          </ul>
        </li>
      </li>
    </ul>
  );
}
