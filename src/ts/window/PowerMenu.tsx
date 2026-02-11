import { Astal, Gtk } from "ags/gtk4";
import SysButton from "../components/button/SysButton";
import Padding from "../components/Padding";
import PopupWindow from "./PopupWindow";

export const WINDOW_NAME = "powermenu";

export default function PowerMenu() {
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
          <Gtk.FlowBox
            $={(self) => {
              self.connect("child-activated", (_, child) => {
                child.get_child()?.activate();
              });
            }}
            cssClasses={["window-content", "powermenu-container"]}
            rowSpacing={6}
            columnSpacing={6}
            maxChildrenPerLine={4}
            homogeneous
          >
            <SysButton action={"sleep"} label={"Sleep"} />
            <SysButton action={"logout"} label={"Logout"} />
            <SysButton action={"reboot"} label={"Reboot"} />
            <SysButton action={"shutdown"} label={"Shutdown"} />
          </Gtk.FlowBox>
          <Padding vertical windowName={WINDOW_NAME} />
        </box>
        <Padding horizontal windowName={WINDOW_NAME} />
      </box>
    </PopupWindow>
  );
}
