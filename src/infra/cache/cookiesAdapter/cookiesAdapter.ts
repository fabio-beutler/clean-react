import Cookies from "js-cookie";

import { SetStorage } from "@/data/protocols/cache";

export class CookiesAdapter implements SetStorage {
  set(key: string, value: Record<any, any> | undefined): void {
    if (!value) {
      Cookies.remove(key);
    } else {
      Cookies.set(key, JSON.stringify(value));
    }
  }
}
