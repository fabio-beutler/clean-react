import { SetStorage } from "@/data/protocols/cache";
import { SaveAccessToken } from "@/domain/useCases";

const LOCAL_STORAGE_KEY = "@4Devs:accessToken";

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly setStorage: SetStorage) {}
  async save(accessToken: string): Promise<void> {
    await this.setStorage.set(LOCAL_STORAGE_KEY, accessToken);
    return Promise.resolve();
  }
}
