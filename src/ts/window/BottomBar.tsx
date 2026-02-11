/** biome-ignore-all lint/a11y/useButtonType: not required */
/** biome-ignore-all lint/a11y/noLabelWithoutControl: not required */

import AstalMpris from "gi://AstalMpris";
import { createBinding, With } from "ags";
import { Astal, type Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { onCleanup } from "gnim";
import MediaPlayer from "../components/MediaPlayer";
import NetworkSpeedPanelButton from "../components/button/NetworkSpeedPanelButton";
import DockApps from "../components/DockApps";

function Start() {
  const mpris = AstalMpris.get_default();
  const player = createBinding(mpris, "players").as((players) => players[0]);

  return (
    <box $type="start">
      <With value={player}>{(p) => <MediaPlayer player={p} />}</With>
    </box>
  );
}

function Center() {
  return (
    <box $type="center">
      <DockApps />
    </box>
  );
}

function End() {
  return (
    <box $type="end">
      <NetworkSpeedPanelButton />
    </box>
  );
}

type Props = JSX.IntrinsicElements["window"] & {
  gdkmonitor: Gdk.Monitor;
};

export default function StatusBar({ gdkmonitor, ...props }: Props) {
  let win: Astal.Window;
  const { BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor;

  onCleanup(() => {
    win.destroy();
  });

  return (
    <window
      $={(self) => {
        win = self;
        // problem when change bar size via margin/padding live
        // https://github.com/wmww/gtk4-layer-shell/issues/60
        self.set_default_size(1, 1);
      }}
      visible
      name="statusbar"
      class="statusbar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={BOTTOM | LEFT | RIGHT}
      application={app}
      {...props}
    >
      <centerbox cssClasses={["statusbar-container"]}>
        <Start />
        <Center />
        <End />
      </centerbox>
    </window>
  );
}
