import { SetStorage } from "@/data/protocols/cache";
import { UnexpectedError } from "@/domain/errors";
import { AccountModel } from "@/domain/models";
import { UpdateCurrentAccount } from "@/domain/useCases";

const LOCAL_STORAGE_KEY = "@4Devs:account";

export class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  constructor(private readonly setStorage: SetStorage) {}
  async save(account: AccountModel | undefined): Promise<void> {
    if (!account?.accessToken) {
      throw new UnexpectedError();
    }
    this.setStorage.set(LOCAL_STORAGE_KEY, JSON.stringify(account));
  }
}
