import { Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";

type Props = {
  horizontal?: boolean;
  vertical?: boolean;
  windowName: string;
};

export default function Padding({
  horizontal = false,
  vertical = false,
  windowName,
}: Props) {
  return (
    <box hexpand={horizontal} vexpand={vertical}>
      <Gtk.GestureClick
        onReleased={() => {
          app.toggle_window(windowName);
        }}
      />
    </box>
  );
}
