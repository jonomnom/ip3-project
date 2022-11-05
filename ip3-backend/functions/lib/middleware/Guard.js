"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guard = void 0;
const functions = require("firebase-functions");
function guard(handler) {
    return async (data, context) => {
        var _a;
        if (!((_a = context.auth) === null || _a === void 0 ? void 0 : _a.uid)) {
            throw new functions.https.HttpsError("permission-denied", "You are not authorized to call this function");
        }
        return handler(data, context);
    };
}
exports.guard = guard;
//# sourceMappingURL=Guard.js.map