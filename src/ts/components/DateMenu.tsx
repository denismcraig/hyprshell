import { createComputed, With } from "ags";
import PopupWindow from "./PopupWindow";
import { Gtk } from "ags/gtk4";

export const WINDOW_NAME = "datemenu-window";

export default function DateMenu() {
  const layout = createComputed(() => {
    return `top_center`;
  });

  return (
    <With value={layout}>
      {(l) => (
        <PopupWindow name={WINDOW_NAME} layout={l}>
          <box
            orientation={Gtk.Orientation.VERTICAL}
            cssClasses={["window-content", "datemenu-container"]}
          >
            <Gtk.Calendar />
          </box>
        </PopupWindow>
      )}
    </With>
  );
}
