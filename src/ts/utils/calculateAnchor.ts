import Astal from "gi://Astal";

export default function calculateAnchor(position: string) {
  const { TOP, RIGHT, BOTTOM, LEFT } = Astal.WindowAnchor;

  switch (position) {
    case "top":
      return TOP | LEFT | RIGHT;
    case "top_center":
      return TOP;
    case "top_left":
      return TOP | LEFT;
    case "top_right":
      return TOP | RIGHT;
    case "bottom":
      return BOTTOM | LEFT | RIGHT;
    case "bottom_center":
      return BOTTOM;
    case "bottom_left":
      return BOTTOM | LEFT;
    case "bottom_right":
      return BOTTOM | RIGHT;
    case "full":
      return TOP | BOTTOM | LEFT | RIGHT;
    default:
      return undefined;
  }
}
