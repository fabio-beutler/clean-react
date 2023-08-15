import { faker } from "@faker-js/faker";

import { HttpPostClientSpy } from "@/data/test";
import { AccountModel } from "@/domain/models";
import { mockAddAccount } from "@/domain/test/mockAddAcccount";
import { AddAccountParams } from "@/domain/useCases";

import { RemoteAddAccount } from "./remoteAddAccount";

type SutTypes = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AddAccountParams,
    AccountModel
  >();
  const sut = new RemoteAddAccount(url, httpPostClientSpy);
  return { sut, httpPostClientSpy };
};

describe("RemoteAddAccount", () => {
  test("Should call HttpClient with correct URL", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.add(mockAddAccount());
    expect(httpPostClientSpy.url).toBe(url);
  });
});
