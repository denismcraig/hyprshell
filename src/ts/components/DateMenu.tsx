import { createComputed, With } from "ags";
import { Gtk } from "ags/gtk4";
import PopupWindow from "../window/PopupWindow";

export const WINDOW_NAME = "datemenu-window";

export default function DateMenu() {
  const layout = createComputed(() => {
    return `top_right`;
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
