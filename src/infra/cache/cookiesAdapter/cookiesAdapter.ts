import { SetStorage } from "@/data/protocols/cache";

export class CookiesAdapter implements SetStorage {
  set(key: string, value: string): void {
    document.cookie = `${key}=${value}`;
  }
}
