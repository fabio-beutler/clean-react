import "vitest-localstorage-mock";

import { faker } from "@faker-js/faker";

import { LocalStorageAdapter } from "./localStorageAdapter";

describe("LocalStorageAdapter", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("Should call localStorage with correct values", () => {
    const sut = new LocalStorageAdapter();
    const key = faker.database.column();
    const value = faker.word.sample();
    sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
  });
});
