export function isObject<T>(val: T): boolean {
  return typeof val === "object" && val?.constructor !== FormData && val !== null;
}
