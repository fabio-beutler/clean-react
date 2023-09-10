import { faker } from "@faker-js/faker";

import { HttpGetParams } from "@/data/protocols/http";
import { GetStorageSpy, HttpGetClientSpy, mockGetRequest } from "@/data/test";
import { mockAccountModel } from "@/domain/test";
import { ACCOUNT_STORAGE_KEY } from "@/main/config";

import { AuthorizeHttpGetClientDecorator } from "./authorizeHttpGetClientDecorator";

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator;
  getStorageSpy: GetStorageSpy;
  httpGetClientSpy: HttpGetClientSpy<any>;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new AuthorizeHttpGetClientDecorator(
    getStorageSpy,
    httpGetClientSpy,
  );
  return {
    sut,
    getStorageSpy,
    httpGetClientSpy,
  };
};

describe("AuthorizeHttpGetClient", () => {
  test("Should class GetStorage with correct value", async () => {
    const { sut, getStorageSpy } = makeSut();
    await sut.get(mockGetRequest());
    expect(getStorageSpy.key).toBe(ACCOUNT_STORAGE_KEY);
  });

  test("Should not add headers if GetStorage is invalid", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field: faker.word.words(),
      },
    };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toBe(httpRequest.headers);
  });

  test("Should add token to HttpGetClient", async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut();
    getStorageSpy.value = mockAccountModel();
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
    };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual({
      "x-access-token": getStorageSpy.value.accessToken,
    });
  });

  test("Should merge headers to HttpGetClient", async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut();
    getStorageSpy.value = mockAccountModel();
    const field = faker.word.words();
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field,
      },
    };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    console.log(httpGetClientSpy.headers);
    expect(httpGetClientSpy.headers).toEqual({
      field,
      "x-access-token": getStorageSpy.value.accessToken,
    });
  });
});
