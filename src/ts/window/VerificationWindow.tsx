/** biome-ignore-all lint/a11y/noLabelWithoutControl: because */
/** biome-ignore-all lint/a11y/useButtonType: because */
import { createBinding } from "ags";
import { Astal, Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { exec } from "ags/process";
import Padding from "../components/Padding";
import Powermenu from "../objects/Powermenu";
import PopupWindow from "./PopupWindow";

const WINDOW_NAME = "verification";

export default function VerificationWindow() {
  const powermenu = Powermenu.get_default();

  return (
    <PopupWindow
      name={WINDOW_NAME}
      exclusivity={Astal.Exclusivity.IGNORE}
      layout="full"
    >
      <box>
        <Padding horizontal windowName={WINDOW_NAME} />
        <box orientation={Gtk.Orientation.VERTICAL}>
          <Padding vertical windowName={WINDOW_NAME} />
          <box
            cssClasses={["window-content", "verification-container"]}
            orientation={Gtk.Orientation.VERTICAL}
            spacing={6}
          >
            <label
              label={createBinding(powermenu, "title")}
              cssClasses={["title"]}
            />
            <label label={"Are you sure?"} cssClasses={["body"]} />
            <box cssClasses={["buttons"]} homogeneous spacing={6}>
              <button
                label={"No"}
                onClicked={() => app.toggle_window(WINDOW_NAME)}
                $={(self) => {
                  app.connect("window-toggled", (_, win) => {
                    if (win.name === WINDOW_NAME && win.visible)
                      self.grab_focus();
                  });
                }}
              />
              <button
                label={"Yes"}
                onClicked={() => {
                  exec(powermenu.cmd);
                  app.toggle_window(WINDOW_NAME);
                }}
              />
            </box>
          </box>
          <Padding vertical windowName={WINDOW_NAME} />
        </box>
        <Padding horizontal windowName={WINDOW_NAME} />
      </box>
    </PopupWindow>
  );
}
