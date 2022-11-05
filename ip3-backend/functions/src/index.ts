import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { cert, ServiceAccount } from "firebase-admin/app";
import * as serviceAccountCert from "./serviceAccountCert.json";
import mainApp from "./apps/mainApp";

const appPort = 3001;

const app = admin.initializeApp({
  ...functions.config().firebase,
  credential: cert(serviceAccountCert as ServiceAccount),
});

admin.auth(app);

mainApp.listen(appPort, () => {
  console.log(`IP3 app listening on port ${appPort}...`);
});

exports.api = functions.https.onRequest(mainApp);
