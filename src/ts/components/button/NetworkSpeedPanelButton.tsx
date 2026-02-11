/** biome-ignore-all lint/a11y/noLabelWithoutControl: not required */
import useNetworkSpeed from "../../hooks/useNetworkSpeed";
import PanelButton from "./PanelButton";

export default function NetworkSpeedPanelButton() {
  return (
    <PanelButton window="">
      <box cssClasses={["network-speed"]}>
        <label
          cssClasses={["label", "download"]}
          label={useNetworkSpeed(([download]) => {
            return `${(download / 1024).toFixed(2)} MB/s `;
          })}
        />
        <label
          cssClasses={["label", "upload"]}
          label={useNetworkSpeed(([_, upload]) => {
            return `${(upload / 1024).toFixed(2)} MB/s `;
          })}
        />
      </box>
    </PanelButton>
  );
}
