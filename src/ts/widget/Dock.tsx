// Ripped and adapted from epik-shell
/** biome-ignore-all lint/style/noNonNullAssertion: because */

import { onCleanup } from "ags";
import { Astal, type Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import DockApps from "../components/DockApps";

type Props = JSX.IntrinsicElements["window"] & {
  gdkmonitor: Gdk.Monitor;
};

export default function Dock({ gdkmonitor, ...props }: Props) {
  let win: Astal.Window;
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
      name="dock"
      namespace="dock"
      class="dock"
      layer={Astal.Layer.BOTTOM}
      anchor={Astal.WindowAnchor.BOTTOM}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      gdkmonitor={gdkmonitor}
      application={app}
      {...props}
    >
      <box>
        <box hexpand />
        <DockApps />
        <box hexpand />
      </box>
    </window>
  );
}
