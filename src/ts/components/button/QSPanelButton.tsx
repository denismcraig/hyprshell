import AstalBattery from "gi://AstalBattery";
import AstalBluetooth from "gi://AstalBluetooth";
import AstalWp from "gi://AstalWp";
import { createBinding, With } from "ags";
import app from "ags/gtk4/app";
import { WINDOW_NAME } from "../../window/QSWindow";
import NetworkIcon from "../NetworkIcon";
import PanelButton from "./PanelButton";

export default function QSPanelButton() {
  const battery = AstalBattery.get_default();
  const bluetooth = AstalBluetooth.get_default();
  const wp = AstalWp.get_default();
  // biome-ignore lint/style/noNonNullAssertion: because
  // biome-ignore lint/suspicious/noNonNullAssertedOptionalChain: because
  const speaker = wp?.audio.defaultSpeaker!;

  const isBtPowered = createBinding(bluetooth, "isPowered");
  const isBatteryPresent = createBinding(battery, "isPresent");
  const batteryIcon = createBinding(battery, "batteryIconName");
  const volumeIcon = createBinding(speaker, "volumeIcon");
  const isMute = createBinding(wp.defaultMicrophone, "mute");

  return (
    <PanelButton
      window={WINDOW_NAME}
      onClicked={() => {
        app.toggle_window(WINDOW_NAME);
      }}
    >
      <box spacing={2}>
        <NetworkIcon />
        <box>
          <With value={isBtPowered}>
            {(isPowered) => (
              <image visible={isPowered} iconName={"bluetooth-symbolic"} />
            )}
          </With>
        </box>
        <box visible={isBatteryPresent()}>
          <With value={batteryIcon}>{(icon) => <image iconName={icon} />}</With>
        </box>
        <box>
          <With value={volumeIcon}>{(icon) => <image iconName={icon} />}</With>
        </box>
        <box>
          <With value={isMute}>
            {(mute) => (
              <image visible={mute} iconName="microphone-disabled-symbolic" />
            )}
          </With>
        </box>
      </box>
    </PanelButton>
  );
}
