import Graphene from "gi://Graphene";
import { Astal, Gdk, Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { onCleanup } from "gnim";
import calculateAnchor from "../utils/calculateAnchor";

type Props = JSX.IntrinsicElements["window"] & {
  // biome-ignore lint/suspicious/noExplicitAny: because
  children?: any;
  name: string;
  visible?: boolean;
  animation?: string;
  layout?: string;
  setup?: (self: Astal.Window) => void;
};

export default function PopupWindow({
  children,
  name,
  visible,
  layout = "center",
  setup,
  ...props
}: Props) {
  let win: Astal.Window;
  onCleanup(() => {
    win.destroy();
  });

  return (
    <window
      visible={visible ?? false}
      name={name}
      namespace={name}
      layer={Astal.Layer.TOP}
      keymode={Astal.Keymode.EXCLUSIVE}
      application={app}
      anchor={calculateAnchor(layout)}
      $={(self) => {
        win = self;
        setup?.(self);
      }}
      {...props}
    >
      <Gtk.EventControllerKey
        onKeyPressed={({ widget: win }, key: number) => {
          if (key === Gdk.KEY_Escape) {
            win.hide();
            return true;
          }
        }}
      />
      <Gtk.GestureClick
        onReleased={({ widget: win }, _, x, y) => {
          const [, rect] = children.compute_bounds(win);
          const position = new Graphene.Point({ x, y });

          if (!rect.contains_point(position)) {
            win.visible = false;
            return true;
          }

          return false;
        }}
      />
      {children}
    </window>
  );
}
