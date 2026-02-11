/** biome-ignore-all lint/a11y/noLabelWithoutControl: not required */
/** biome-ignore-all lint/style/noNonNullAssertion: because */

import app from "ags/gtk4/app";
import time from "../utils/time";
import { WINDOW_NAME } from "./DateMenu";
import PanelButton from "./PanelButton";

export default function TimePanelButton({ format = "%a %d %b  %H:%M" }) {
  return (
    <PanelButton
      window={WINDOW_NAME}
      onClicked={() => app.toggle_window(WINDOW_NAME)}
    >
      <label label={time((t) => t.format(format)!)} />
    </PanelButton>
  );
}
