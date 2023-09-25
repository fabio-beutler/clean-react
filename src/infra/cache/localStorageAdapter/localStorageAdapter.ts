import { GetStorage, SetStorage } from "@/data/protocols/cache";

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set(key: string, value: Record<any, any> | undefined): void {
    if (!value) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  get(key: string): any {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem(key)!);
    }
  }
}
