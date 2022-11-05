"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userExists = void 0;
async function userExists(auth, uid) {
    try {
        await auth.getUser(uid);
        return true;
    }
    catch (e) {
        if (e.code === "auth/user-not-found") {
            return false;
        }
        throw e;
    }
}
exports.userExists = userExists;
//# sourceMappingURL=userExists.js.map