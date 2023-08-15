import { faker } from "@faker-js/faker";

import { CookiesAdapter } from "./cookiesAdapter";

const makeSut = (): CookiesAdapter => {
  return new CookiesAdapter();
};

describe("CookiesAdapter", () => {
  test("Should call document.cookie with correct values", () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.word.sample();
    sut.set(key, value);
    expect(document.cookie).toBe(`${key}=${value}`);
  });
});
