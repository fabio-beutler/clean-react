import { GetStorageSpy, mockGetRequest } from "@/data/test";
import { ACCOUNT_STORAGE_KEY } from "@/main/config";

import { AuthorizeHttpGetClientDecorator } from "./authorizeHttpGetClientDecorator";

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator;
  getStorageSpy: GetStorageSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy);
  return {
    sut,
    getStorageSpy,
  };
};

describe("AuthorizeHttpGetClient", () => {
  test("Should class GetStorage with correct value", () => {
    const { sut, getStorageSpy } = makeSut();
    sut.get(mockGetRequest());
    expect(getStorageSpy.key).toBe(ACCOUNT_STORAGE_KEY);
  });
});
