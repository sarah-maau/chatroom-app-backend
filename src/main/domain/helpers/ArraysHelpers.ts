export function filterNullAndUndefinedAndEmpty<T>(): (v: T | undefined) => v is T {
  return (v: T | undefined): v is T => !!v
}
