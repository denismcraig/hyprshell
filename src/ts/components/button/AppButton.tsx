/** biome-ignore-all lint/a11y/useButtonType: not required */

import type AstalApps from "gi://AstalApps";
import AstalHyprland from "gi://AstalHyprland";
import { createBinding } from "ags";
import { Gtk } from "ags/gtk4";
import gtk4app from "ags/gtk4/app";

type Props = JSX.IntrinsicElements["button"] & {
  app: AstalApps.Application;
  pinned?: boolean;
  term: string;
  client?: AstalHyprland.Client;
};

const hyprland = AstalHyprland.get_default();
const iconTheme = new Gtk.IconTheme({ themeName: gtk4app.iconTheme });

export default function AppButton({
  app,
  onClicked,
  term,
  pinned = false,
  client,
}: Props) {
  // TODO: Work out if this is wanted/required in our setup
  // const substitute: Record<string, unknown> = {
  //   kitty: "terminal",
  //   localsend: "send-to",
  //   "spotify-client": "org.gnome.Lollypop-spotify",
  //   "org.gnome.Nautilus": "system-file-manager",
  // };

  const iconName = app.iconName;

  return (
    <button
      onClicked={onClicked}
      cssClasses={createBinding(hyprland, "focusedClient").as((fcsClient) => {
        const classes = ["app-button"];
        if (!fcsClient || !term || !fcsClient.class) return classes;

        const isFocused = !pinned
          ? client?.address === fcsClient.address
          : fcsClient.class.toLowerCase().includes(term.toLowerCase());

        if (isFocused) classes.push("focused");
        return classes;
      })}
    >
      <overlay>
        <box cssClasses={["box"]} />
        <image
          $type="overlay"
          halign={Gtk.Align.CENTER}
          valign={Gtk.Align.CENTER}
          iconName={`${iconName}`}
          pixelSize={iconTheme.has_icon(`${iconName}`) ? 32 : 38}
        />
        <box
          $type="overlay"
          cssClasses={["indicator"]}
          valign={Gtk.Align.END}
          halign={Gtk.Align.CENTER}
          visible={createBinding(hyprland, "clients").as((clients) => {
            return clients
              .map((e) => e.class.toLowerCase())
              .includes(term.toLowerCase());
          })}
        />
      </overlay>
    </button>
  );
}
