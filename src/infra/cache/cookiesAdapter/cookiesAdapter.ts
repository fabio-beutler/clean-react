import { SetStorage } from "@/data/protocols/cache";

export class CookiesAdapter implements SetStorage {
  async set(key: string, value: string): Promise<void> {
    document.cookie = `${key}=${value}`;
  }
}
