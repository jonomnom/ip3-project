/**
 * Verify all inputs are defined.
 *
 * @param {(undefined | T) []} args arguments to check
 * @return {Predicate}
 */
export function isInputDefined<T>(args: (undefined | T)[]): args is T[] {
  return args.every((e) => e !== undefined);
}

/**
 * Checks whether input value is an array of non empty strings.
 *
 * @param value value to check
 * @returns boolean to indicate the result
 */
export function isNonEmptyArrayOfStrings(value: unknown): boolean {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((item) => typeof item === "string")
  );
}