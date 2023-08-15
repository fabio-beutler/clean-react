import { faker } from "@faker-js/faker";

import { CookiesAdapter } from "./cookiesAdapter";

describe("CookiesAdapter", () => {
  test("Should call document.cookie with correct values", () => {
    const sut = new CookiesAdapter();
    const key = faker.database.column();
    const value = faker.word.sample();
    sut.set(key, value);
    expect(document.cookie).toBe(`${key}=${value}`);
  });
});
