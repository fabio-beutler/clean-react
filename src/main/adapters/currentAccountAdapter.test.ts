import { mockAccountModel } from "@/domain/test";
import { LocalStorageAdapter } from "@/infra/cache/localStorageAdapter";

import { setCurrentAccountAdapter } from "./currentAccountAdapter";

const LOCAL_STORAGE_KEY = "@4Devs:account";

vi.mock("@/infra/cache/localStorageAdapter");

describe("CurrentAccountAdapter", () => {
  test("Should call LocalStorageAdapter with correct values", () => {
    const account = mockAccountModel();
    const setSpy = vi.spyOn(LocalStorageAdapter.prototype, "set");
    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith(LOCAL_STORAGE_KEY, account);
  });
});
