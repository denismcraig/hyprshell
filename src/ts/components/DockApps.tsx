import type AstalApps from "gi://AstalApps";
import AstalMpris from "gi://AstalMpris";
import { createBinding, With } from "ags";
import { Gtk } from "ags/gtk4";
import { exec } from "ags/process";
import AppButton from "./AppButton";
import AppsList from "./AppsList";
import MediaPlayer from "./MediaPlayer";

export default function DockApps() {
  const mpris = AstalMpris.get_default();
  const player = createBinding(mpris, "players").as((players) => players[0]);
  return (
    <box cssClasses={["window-content", "dock-container"]} hexpand={false}>
      <AppsList />
      <box>
        <With value={player}>{(p) => <MediaPlayer player={p} />}</With>
      </box>
      <Gtk.Separator orientation={Gtk.Orientation.VERTICAL} />
      <AppButton
        app={{ iconName: "org.gnome.Nautilus" } as AstalApps.Application}
        onClicked={() => exec("nautilus")}
        term={"nautilus"}
      />
    </box>
  );
}
