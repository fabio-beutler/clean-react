import "vitest-localstorage-mock";

import { faker } from "@faker-js/faker";

import { LocalStorageAdapter } from "./localStorageAdapter";

const makeSut = (): LocalStorageAdapter => {
  return new LocalStorageAdapter();
};

describe("LocalStorageAdapter", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("Should call localStorage.setItem with correct values", () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.word.sample();
    sut.set(key, { value });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify({ value }),
    );
  });

  test("Should call localStorage.getItem with correct values", () => {
    const sut = makeSut();
    const key = faker.database.column();
    sut.get(key);
    expect(localStorage.getItem).toHaveBeenCalledWith(key);
  });
});
