import type GObject from "gi://GObject";
import { Gtk } from "ags/gtk4";

export default function separatorBetween(
  elements: GObject.Object[],
  orientation: Gtk.Orientation,
) {
  const spacedElements: GObject.Object[] = [];

  elements.forEach((element, index) => {
    if (index > 0) {
      spacedElements.push(new Gtk.Separator({ orientation: orientation }));
    }
    spacedElements.push(element);
  });

  return spacedElements;
}
