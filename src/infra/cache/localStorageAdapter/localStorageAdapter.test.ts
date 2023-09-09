import "vitest-localstorage-mock";

import { faker } from "@faker-js/faker";

import { UnexpectedError } from "@/domain/errors";

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
    // localStorage is mocked by 'vitest-localstorage-mock'
    // @ts-ignore
    localStorage.getItem.mockImplementationOnce(() =>
      JSON.stringify({ [key]: faker.word.sample() }),
    );
    sut.get(key);
    expect(localStorage.getItem).toHaveBeenCalledWith(key);
  });

  test("Should receive from localStorage.getItem correct value", () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = { sample: faker.word.sample() };
    // localStorage is mocked by 'vitest-localstorage-mock'
    // @ts-ignore
    localStorage.getItem.mockImplementationOnce(() => JSON.stringify(value));
    const obj = sut.get(key);
    expect(obj).toEqual(value);
  });

  test("Should throw UnexpectedError if localStorage.getItem do not found given key", () => {
    const sut = makeSut();
    // localStorage is mocked by 'vitest-localstorage-mock'
    // @ts-ignore
    localStorage.getItem.mockImplementationOnce(() => undefined);
    expect(() => sut.get(faker.database.column())).toThrow(
      new UnexpectedError(),
    );
  });
});
