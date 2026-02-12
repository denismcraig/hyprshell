import { createBinding, For, This } from "ags";
import app from "ags/gtk4/app";
import style from "./scss/style.scss";
import DateMenu from "./ts/components/DateMenu";
import BottomBar from "./ts/window/BottomBar";
import PowerMenu from "./ts/window/PowerMenu";
import VerificationWindow from "./ts/window/VerificationWindow";

function ui() {
  const monitors = createBinding(app, "monitors");
  DateMenu();
  PowerMenu();
  VerificationWindow();

  return (
    <For each={monitors}>
      {(monitor) => (
        <This this={app}>
          <BottomBar gdkmonitor={monitor} />
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
