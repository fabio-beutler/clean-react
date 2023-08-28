import { SetStorage } from "@/data/protocols/cache";
import { UnexpectedError } from "@/domain/errors";
import { SaveAccessToken } from "@/domain/useCases";

const LOCAL_STORAGE_KEY = "@4Devs:accessToken";

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly setStorage: SetStorage) {}
  async save(accessToken: string | undefined): Promise<void> {
    if (!accessToken) {
      throw new UnexpectedError();
    }
    await this.setStorage.set(LOCAL_STORAGE_KEY, accessToken);
    return Promise.resolve();
  }
}
