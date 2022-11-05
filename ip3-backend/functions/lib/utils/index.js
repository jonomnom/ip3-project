"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNonEmptyArrayOfStrings = exports.isInputDefined = void 0;
/**
 * Verify all inputs are defined.
 *
 * @param {(undefined | T) []} args arguments to check
 * @return {Predicate}
 */
function isInputDefined(args) {
    return args.every((e) => e !== undefined);
}
exports.isInputDefined = isInputDefined;
/**
 * Checks whether input value is an array of non empty strings.
 *
 * @param value value to check
 * @returns boolean to indicate the result
 */
function isNonEmptyArrayOfStrings(value) {
    return (Array.isArray(value) &&
        value.length > 0 &&
        value.every((item) => typeof item === "string"));
}
exports.isNonEmptyArrayOfStrings = isNonEmptyArrayOfStrings;
//# sourceMappingURL=index.js.map