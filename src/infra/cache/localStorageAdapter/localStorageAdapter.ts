import { GetStorage, SetStorage } from "@/data/protocols/cache";
import { UnexpectedError } from "@/domain/errors";

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set(key: string, value: Record<any, any>): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    const data = localStorage.getItem(key);
    if (!data) throw new UnexpectedError();
    return JSON.parse(data);
  }
}
