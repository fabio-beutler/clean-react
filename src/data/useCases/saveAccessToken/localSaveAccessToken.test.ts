import { faker } from "@faker-js/faker";

import { SetStorageMock } from "@/data/test";

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
});
