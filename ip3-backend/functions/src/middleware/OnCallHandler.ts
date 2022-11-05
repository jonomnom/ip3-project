import { CallableContext } from "firebase-functions/lib/common/providers/https";

export type OnCallHandler<Data> = (
  data: Data,
  context: CallableContext
) => Promise<unknown>;
