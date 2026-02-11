/** biome-ignore-all lint/suspicious/noExplicitAny: because */
import { Accessor } from "ags";

/** convert a normal value or accessor to a boolean/Accessor<boolean> value.
 * equivalent to Boolean(value), but adds support to Accessor and arrays.
 *
 * @returns false when the value is falsy("", 0, false, undefined, null) or an empty array,
 * if something else, true */
export function toBoolean(
  variable: any | Array<any> | Accessor<Array<any> | any>,
): boolean | Accessor<boolean> {
  return variable instanceof Accessor
    ? variable.as((v) =>
        Array.isArray(v) ? (v as Array<any>).length > 0 : Boolean(v),
      )
    : Array.isArray(variable)
      ? variable.length > 0
      : Boolean(variable);
}
