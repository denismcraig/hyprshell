import { Gtk } from "ags/gtk4";
import Powermenu from "../../objects/Powermenu";

type Props = JSX.IntrinsicElements["button"] & {
  action: string;
  label: string;
};

const powermenu = Powermenu.get_default();

const icons: Record<string, string> = {
  sleep: "weather-clear-night-symbolic",
  reboot: "system-reboot-symbolic",
  logout: "system-log-out-symbolic",
  shutdown: "system-shutdown-symbolic",
};

export default function SysButton({ action, label, ...props }: Props) {
  return (
    <button
      cssClasses={["system-button"]}
      onClicked={() => powermenu.action(action)}
      {...props}
    >
      <box orientation={Gtk.Orientation.VERTICAL} spacing={6}>
        <image iconName={icons[action]} iconSize={Gtk.IconSize.LARGE} />
        {/** biome-ignore lint/a11y/noLabelWithoutControl: because */}
        <label label={label} />
      </box>
    </button>
  );
}
