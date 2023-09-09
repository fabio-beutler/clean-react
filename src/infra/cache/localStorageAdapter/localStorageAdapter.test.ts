import "vitest-localstorage-mock";

import { faker } from "@faker-js/faker";
import { SpyInstance } from "vitest";

import { LocalStorageAdapter } from "./localStorageAdapter";

let windowSpy: SpyInstance;

const makeSut = (): LocalStorageAdapter => {
  return new LocalStorageAdapter();
};

beforeEach(() => {
  windowSpy = vi.spyOn(globalThis, "window", "get");
  windowSpy.mockImplementation(() => ({
    location: {
      href: "/",
    },
  }));
});

afterEach(() => {
  windowSpy.mockRestore();
});

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

  test("Should access localStorage.getItem if window exists", () => {
    windowSpy.mockImplementation(() => undefined);
    const sut = makeSut();
    expect(sut.get(faker.database.column())).toBeUndefined();
  });
});
