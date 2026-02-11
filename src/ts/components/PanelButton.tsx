import type { Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";

type Props = JSX.IntrinsicElements["button"] & {
  children?: unknown;
  window?: string;
  setup?: (self: Gtk.Button) => void;
};

export default function PanelButton({
  children,
  window,
  setup,
  ...props
}: Props) {
  return (
    <button
      cssClasses={["panel-button"]}
      $={(self) => {
        if (!window) {
          return;
        }

        let open = false;
        self.add_css_class(window);
        app.connect("window-toggled", (_, win) => {
          if (win.name !== window) {
            return;
          }

          if (open && !win.visible) {
            open = false;
            self.remove_css_class("active");
          }

          if (win.visible) {
            open = true;
            self.add_css_class("active");
          }
        });

        setup?.(self);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
