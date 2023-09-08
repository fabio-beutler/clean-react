import { SetStorage } from "@/data/protocols/cache";

export class CookiesAdapter implements SetStorage {
  set(key: string, value: Record<any, any>): void {
    document.cookie = `${key}=${JSON.stringify(value)}`;
  }
}
