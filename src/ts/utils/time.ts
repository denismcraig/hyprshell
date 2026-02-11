import GLib from "gi://GLib";
import { createPoll } from "ags/time";

const time = createPoll(GLib.DateTime.new_now_local(), 1000, () =>
  GLib.DateTime.new_now_local(),
);

export default time;
