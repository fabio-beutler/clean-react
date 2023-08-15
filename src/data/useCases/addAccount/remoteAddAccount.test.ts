import { faker } from "@faker-js/faker";

import { HttpStatusCode } from "@/data/protocols/http";
import { HttpPostClientSpy } from "@/data/test";
import { EmailInUseError, UnexpectedError } from "@/domain/errors";
import { AccountModel } from "@/domain/models";
import { mockAccountModel, mockAuthentication } from "@/domain/test";
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
  test("Should call HttpPostClient with correct URL", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockAccountModel(),
    };
    await sut.add(mockAddAccount());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test("Should call HttpPostClient with correct body", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockAccountModel(),
    };
    const authenticationParams = mockAddAccount();
    await sut.add(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  test("Should throw EmailInUserError if HttpPostClient returns 403", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const addAccountParams = mockAddAccount();
    const promise = sut.add(addAccountParams);
    await expect(promise).rejects.toThrow(new EmailInUseError());
  });

  test("Should throw UnexpectedError if HttpPostClient returns 400", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const addAccountParams = mockAddAccount();
    const promise = sut.add(addAccountParams);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should throw UnexpectedError if HttpPostClient returns 500", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.add(mockAddAccount());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
