"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app_1 = require("firebase-admin/app");
const serviceAccountCert = require("./serviceAccountCert.json");
const mainApp_1 = require("./apps/mainApp");
const appPort = 3001;
const app = admin.initializeApp(Object.assign(Object.assign({}, functions.config().firebase), { credential: (0, app_1.cert)(serviceAccountCert) }));
admin.auth(app);
mainApp_1.default.listen(appPort, () => {
    console.log(`IP3 app listening on port ${appPort}...`);
});
exports.api = functions.https.onRequest(mainApp_1.default);
//# sourceMappingURL=index.js.map