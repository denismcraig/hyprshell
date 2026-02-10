import app from "ags/gtk4/app";
import style from "./scss/style.scss";
import StatusBar from "./ts/widget/StatusBar";
import Dock from "./ts/widget/Dock";

app.start({
  instanceName: "hyprshell",
  css: style,
  requestHandler(argv: string[], response: (response: string) => void) {
    console.log("request", ...argv);
    response(["hello friend", ...argv].join(","));
  },
  main() {
    app.get_monitors().map(StatusBar);
    app.get_monitors().map(Dock);
  },
});
