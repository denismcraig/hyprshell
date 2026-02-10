/** biome-ignore-all lint/a11y/noLabelWithoutControl: not required */
/** biome-ignore-all lint/a11y/useButtonType: not required */
import AstalMpris from "gi://AstalMpris?version=0.1";
import Pango from "gi://Pango";
import { createBinding } from "ags";
import { Gtk } from "ags/gtk4";

type Props = {
  player: AstalMpris.Player;
};

export default function MediaPlayer({ player }: Props) {
  if (!player) {
    return <box />;
  }

  const title = createBinding(player, "title").as((t) => t || "Unknown Track");
  const artist = createBinding(player, "artist").as(
    (a) => a || "Unknown Artist",
  );

  const coverArt = createBinding(player, "coverArt");
  const playIcon = createBinding(player, "playbackStatus").as((s) =>
    s === AstalMpris.PlaybackStatus.PLAYING
      ? "media-playback-pause-symbolic"
      : "media-playback-start-symbolic",
  );

  return (
    <box cssClasses={["media-player"]} hexpand>
      <image
        overflow={Gtk.Overflow.HIDDEN}
        pixelSize={35}
        cssClasses={["cover"]}
        file={coverArt}
      />
      <box orientation={Gtk.Orientation.VERTICAL} hexpand>
        <label
          ellipsize={Pango.EllipsizeMode.END}
          halign={Gtk.Align.START}
          label={title}
          maxWidthChars={15}
        />
        <label
          ellipsize={Pango.EllipsizeMode.END}
          halign={Gtk.Align.START}
          label={artist}
          maxWidthChars={15}
        />
      </box>
      <button
        halign={Gtk.Align.END}
        valign={Gtk.Align.CENTER}
        onClicked={() => player.play_pause()}
        visible={createBinding(player, "canControl")}
      >
        <image iconName={playIcon} pixelSize={18} />
      </button>
      <button
        halign={Gtk.Align.END}
        valign={Gtk.Align.CENTER}
        onClicked={() => player.next()}
        visible={createBinding(player, "canGoNext")}
      >
        <image iconName="media-skip-forward-symbolic" pixelSize={24} />
      </button>
    </box>
  );
}
