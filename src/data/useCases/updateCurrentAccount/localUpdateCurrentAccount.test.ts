import { SetStorageMock } from "@/data/test";
import { UnexpectedError } from "@/domain/errors";
import { mockAccountModel } from "@/domain/test";

import { LocalUpdateCurrentAccount } from "./localUpdateCurrentAccount";

type SutTypes = {
  sut: LocalUpdateCurrentAccount;
  setStorageMock: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalUpdateCurrentAccount(setStorageMock);
  return { sut, setStorageMock };
};

describe("LocalUpdateCurrentAccount", () => {
  test("Should call SetStorage with correct value", async () => {
    const { sut, setStorageMock } = makeSut();
    const accessToken = mockAccountModel();
    await sut.save(accessToken);
    expect(setStorageMock.key).toBe("@4Devs:account");
    expect(setStorageMock.value).toBe(JSON.stringify(accessToken));
  });

  test("Should throw if SetStorage throws", async () => {
    const { sut, setStorageMock } = makeSut();
    vi.spyOn(setStorageMock, "set").mockRejectedValueOnce(new Error());
    const promise = sut.save(mockAccountModel());
    expect(promise).rejects.toThrow(new Error());
  });

  test("Should throw if accessToken is falsy", async () => {
    const { sut } = makeSut();
    const promise = sut.save(undefined);
    expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
