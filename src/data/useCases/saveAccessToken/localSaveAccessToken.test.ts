import { faker } from "@faker-js/faker";

import { SetStorageMock } from "@/data/test";
import { UnexpectedError } from "@/domain/errors";

import { LocalSaveAccessToken } from "./localSaveAccessToken";

type SutTypes = {
  sut: LocalSaveAccessToken;
  setStorageMock: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalSaveAccessToken(setStorageMock);
  return { sut, setStorageMock };
};

describe("LocalSaveAccessToken", () => {
  test("Should call SetStorage with correct value", async () => {
    const { sut, setStorageMock } = makeSut();
    const accessToken = faker.string.uuid();
    await sut.save(accessToken);
    expect(setStorageMock.key).toBe("@4Devs:accessToken");
    expect(setStorageMock.value).toBe(accessToken);
  });

  test("Should throw if SetStorage throws", async () => {
    const { sut, setStorageMock } = makeSut();
    vi.spyOn(setStorageMock, "set").mockRejectedValueOnce(new Error());
    const promise = sut.save(faker.string.uuid());
    expect(promise).rejects.toThrow(new Error());
  });

  test("Should throw if accessToken is falsy", async () => {
    const { sut } = makeSut();
    const promise = sut.save(undefined);
    expect(promise).rejects.toThrow(new UnexpectedError());
  });
});