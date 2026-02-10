// Ripped and adapted from epik-shell
/** biome-ignore-all lint/style/noNonNullAssertion: because */

import AstalHyprland from "gi://AstalHyprland";
import { createBinding, createEffect, createState, onCleanup } from "ags";
import { Astal, type Gdk, Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";

type Props = JSX.IntrinsicElements["window"] & {
  gdkmonitor: Gdk.Monitor;
};

const hyprland = AstalHyprland.get_default();

const getSize = (win: Gtk.Window) => win.get_child()!.get_preferred_size()[0];

const getHoverHeight = () => {
  const hyprlandGapsOut = hyprland
    .message("getoption general:gaps_out")
    .split("\n")[0]
    .split("custom type: ")[1]
    .split(" ")
    .map(parseInt);
  return hyprlandGapsOut.length >= 3 ? hyprlandGapsOut[2] : hyprlandGapsOut[0];
};

const [widthVar, setWidthVar] = createState(0);
const [heightVar, setHeightVar] = createState(0);
const [cursorInDock, setCursorInDock] = createState(false);

const updateVisibility = () => {
  return (
    hyprland.get_workspace(hyprland.get_focused_workspace().id)?.get_clients()
      .length <= 0
  );
};

export function DockHover({ gdkmonitor }: Props) {
  createEffect(() => {
    createBinding(hyprland, "focusedWorkspace")();
    createBinding(hyprland, "clients")();

    if (updateVisibility()) {
      app.get_window("dock")?.show();
      app.get_window("dock-hover")?.hide();
    }
    if (!updateVisibility() && !cursorInDock.peek()) {
      app.get_window("dock")?.hide();
      app.get_window("dock-hover")?.show();
    }
  });

  return (
    <window
      visible={!updateVisibility()}
      name="dock-hover"
      namespace="dock-hover"
      class="dock-hover"
      layer={Astal.Layer.TOP}
      anchor={Astal.WindowAnchor.BOTTOM}
      gdkmonitor={gdkmonitor}
      application={app}
      $={(self) => {
        app.connect("window-toggled", (_, win) => {
          if (win.name === "dock" && win.visible) {
            self.visible = false;
          }
        });

        onCleanup(() => {
          self.destroy();
        });
      }}
    >
      <Gtk.EventControllerMotion
        onEnter={(source) => {
          source.widget.hide();
          app.get_window("dock")?.show();
        }}
      />
      <box
        cssClasses={["dock-padding"]}
        heightRequest={heightVar()}
        $={(self) => {
          createEffect(() => {
            self.widthRequest = widthVar();
          });
        }}
      >
        {/* I dont know why window/box not visible when there's no child/background-color */}
        {/* So I give this child and set it to transparent so I can detect hover */}
        hehe
      </box>
    </window>
  );
}

export default function Dock({ gdkmonitor, ...props }: Props) {
  return (
    <window
      visible
      name="dock"
      namespace="dock"
      class="dock"
      layer={Astal.Layer.TOP}
      anchor={Astal.WindowAnchor.BOTTOM}
      gdkmonitor={gdkmonitor}
      application={app}
      $={(self) => {
        self.connect("notify::visible", (win, _) => {
          const size = getSize(win);
          if (widthVar.peek() !== size?.width) {
            setWidthVar(size!.width);
          }
        });

        const size = getSize(self);
        setWidthVar(size!.width);
        setHeightVar(getHoverHeight());

        onCleanup(() => {
          self.destroy();
        });
      }}
      {...props}
    >
      <Gtk.EventControllerMotion
        onEnter={() => {
          setCursorInDock(true);
        }}
        onLeave={(source) => {
          setCursorInDock(false);
          if (!updateVisibility()) {
            source.widget.hide();
            app.get_window("dock-hover")?.show();
          }
        }}
      />
      <box>
        <box hexpand />
        {/* Dock apps go here ! */}
        <box hexpand />
      </box>
    </window>
  );
}
