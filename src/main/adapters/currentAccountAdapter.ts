import { UnexpectedError } from "@/domain/errors";
import { AccountModel } from "@/domain/models";
import { makeLocalStorageAdapter } from "@/main/factories";

const LOCAL_STORAGE_KEY = "@4Devs:account";

export const setCurrentAccountAdapter = (account: AccountModel) => {
  if (!account?.accessToken) {
    throw new UnexpectedError();
  }
  makeLocalStorageAdapter().set(LOCAL_STORAGE_KEY, account);
};
