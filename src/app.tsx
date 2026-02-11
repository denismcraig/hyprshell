import { createBinding, For, This } from "ags";
import app from "ags/gtk4/app";
import style from "./scss/style.scss";
import StatusBar from "./ts/widget/StatusBar";
import Dock, { DockHover } from "./ts/widget/Dock";

function ui() {
  const monitors = createBinding(app, "monitors");

  return (
    <For each={monitors}>
      {(monitor) => (
        <This this={app}>
          <StatusBar gdkmonitor={monitor} />
          <DockHover gdkmonitor={monitor} />
          <Dock gdkmonitor={monitor} />
        </This>
      )}
    </For>
  );
}

app.start({
  instanceName: "hyprshell",
  css: style,
  requestHandler(argv: string[], response: (response: string) => void) {
    response(["hello friend", ...argv].join(","));
  },
  main() {
    ui();
  },
});
