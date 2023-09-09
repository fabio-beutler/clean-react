import { UnexpectedError } from "@/domain/errors";
import { AccountModel } from "@/domain/models";
import { mockAccountModel } from "@/domain/test";
import { LocalStorageAdapter } from "@/infra/cache/localStorageAdapter";
import { ACCOUNT_STORAGE_KEY } from "@/main/config";

import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from "./currentAccountAdapter";

vi.mock("@/infra/cache/localStorageAdapter");

describe("CurrentAccountAdapter", () => {
  test("Should call LocalStorageAdapter.set with correct values", () => {
    const account = mockAccountModel();
    const setSpy = vi.spyOn(LocalStorageAdapter.prototype, "set");
    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith(ACCOUNT_STORAGE_KEY, account);
  });

  test("Should throw UnexpectedError if an invalid account is provided", () => {
    expect(() => {
      setCurrentAccountAdapter({
        invalid: "invalidData",
      } as unknown as AccountModel);
    }).toThrow(new UnexpectedError());
  });

  test("Should call LocalStorageAdapter.get with correct values", () => {
    const fakeAccount = mockAccountModel();
    const getSpy = vi
      .spyOn(LocalStorageAdapter.prototype, "get")
      .mockReturnValueOnce(fakeAccount);
    const returnedAccount = getCurrentAccountAdapter();
    expect(getSpy).toHaveBeenCalledWith(ACCOUNT_STORAGE_KEY);
    expect(returnedAccount).toEqual(fakeAccount);
  });
});
