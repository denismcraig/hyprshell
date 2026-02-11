import type AstalApps from "gi://AstalApps";
import { Gtk } from "ags/gtk4";
import { exec } from "ags/process";
import AppsList from "./AppsList";
import AppButton from "./button/AppButton";

export default function DockApps() {
  return (
    <box cssClasses={["window-content", "dock-container"]} hexpand={false}>
      <AppsList />
      <Gtk.Separator orientation={Gtk.Orientation.VERTICAL} />
      <AppButton
        app={{ iconName: "org.gnome.Nautilus" } as AstalApps.Application}
        onClicked={() => exec("nautilus")}
        term={"nautilus"}
      />
    </box>
  );
}
