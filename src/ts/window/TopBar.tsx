/** biome-ignore-all lint/a11y/useButtonType: not required */
/** biome-ignore-all lint/a11y/noLabelWithoutControl: not required */
import { Astal, type Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { onCleanup } from "gnim";
import QSPanelButton from "../components/button/QSPanelButton";
import TimePanelButton from "../components/button/TimePanelButton";
import WorkspacesPanelButton from "../components/button/WorkspacesPanelButton";

function Start() {
  return (
    <box $type="start">
      <QSPanelButton />
    </box>
  );
}

function Center() {
  return (
    <box $type="center">
      <WorkspacesPanelButton />
    </box>
  );
}

function End() {
  return (
    <box $type="end">
      <TimePanelButton />
    </box>
  );
}

type Props = JSX.IntrinsicElements["window"] & {
  gdkmonitor: Gdk.Monitor;
};

export default function StatusBar({ gdkmonitor, ...props }: Props) {
  let win: Astal.Window;
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

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
      anchor={TOP | LEFT | RIGHT}
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
