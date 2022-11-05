import * as functions from "firebase-functions";
import { CallableContext } from "firebase-functions/lib/common/providers/https";
import { OnCallHandler } from "./OnCallHandler";

export function guard<Data>(handler: OnCallHandler<Data>) {
  return async (data: Data, context: CallableContext) => {
    if (!context.auth?.uid) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "You are not authorized to call this function"
      );
    }
    return handler(data, context);
  };
}
