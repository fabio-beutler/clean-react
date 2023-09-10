import { faker } from "@faker-js/faker";

import { GetStorage } from "@/data/protocols/cache";

export class GetStorageSpy implements GetStorage {
  key: string = "";
  value = { random: faker.word.sample() };

  get(key: string): any {
    this.key = key;
    return this.value;
  }
}
