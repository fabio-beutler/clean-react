import { UnexpectedError } from "@/domain/errors";
import { AccountModel } from "@/domain/models";
import { ACCOUNT_STORAGE_KEY } from "@/main/config";
import { makeLocalStorageAdapter } from "@/main/factories";

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  if (!account?.accessToken) {
    throw new UnexpectedError();
  }
  makeLocalStorageAdapter().set(ACCOUNT_STORAGE_KEY, account);
};
