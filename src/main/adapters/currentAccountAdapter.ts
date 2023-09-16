import { UnexpectedError } from "@/domain/errors";
import { AccountModel } from "@/domain/models";
import { ACCOUNT_STORAGE_KEY } from "@/main/config";
import { makeLocalStorageAdapter } from "@/main/factories";

export const setCurrentAccountAdapter = (
  account: AccountModel | undefined,
): void => {
  makeLocalStorageAdapter().set(ACCOUNT_STORAGE_KEY, account);
};

export const getCurrentAccountAdapter = (): AccountModel => {
  return makeLocalStorageAdapter().get(ACCOUNT_STORAGE_KEY);
};
