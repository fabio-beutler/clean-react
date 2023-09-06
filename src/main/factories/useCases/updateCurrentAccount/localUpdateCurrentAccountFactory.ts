import { LocalUpdateCurrentAccount } from "src/data/useCases/updateCurrentAccount";

import { UpdateCurrentAccount } from "@/domain/useCases";
import { makeLocalStorageAdapter } from "@/main/factories";

const makeLocalUpdateCurrentAccount = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(makeLocalStorageAdapter());
};

export default makeLocalUpdateCurrentAccount;
