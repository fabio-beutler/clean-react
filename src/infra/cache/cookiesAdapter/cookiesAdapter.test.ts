import { faker } from "@faker-js/faker";
import Cookies from "js-cookie";

import { CookiesAdapter } from "./cookiesAdapter";

const makeSut = (): CookiesAdapter => {
  return new CookiesAdapter();
};

describe("CookiesAdapter", () => {
  test("Should call document.cookie with correct values", () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.word.sample();
    vi.spyOn(Cookies, "set");
    sut.set(key, { value });
    expect(Cookies.set).toHaveBeenCalledWith(key, JSON.stringify({ value }));
  });

  test("Should remove document.cookie if value is null", () => {
    const sut = makeSut();
    const key = faker.database.column();
    vi.spyOn(Cookies, "remove");
    sut.set(key, undefined);
    expect(Cookies.remove).toHaveBeenCalledWith(key);
  });
});
