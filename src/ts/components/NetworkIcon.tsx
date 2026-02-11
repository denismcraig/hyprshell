import AstalNetwork from "gi://AstalNetwork";
import { createBinding, createComputed, With } from "ags";

export default function NetworkIcon() {
  const network = AstalNetwork.get_default();
  const primary = createBinding(network, "primary");
  const icon = createComputed(() => {
    const p = primary();
    if (
      p === AstalNetwork.Primary.WIRED ||
      p === AstalNetwork.Primary.UNKNOWN
    ) {
      return createBinding(network.wired, "iconName")();
    } else {
      return createBinding(network.wifi, "iconName")();
    }
  });

  return (
    <box>
      <With value={icon}>{(icon) => <image iconName={icon} />}</With>
    </box>
  );
}
