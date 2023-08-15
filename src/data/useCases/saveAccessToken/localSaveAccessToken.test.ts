import { faker } from "@faker-js/faker";

import { SetStorageSpy } from "@/data/test";

import { LocalSaveAccessToken } from "./localSaveAccessToken";

type SutTypes = {
  sut: LocalSaveAccessToken;
  setStorageSpy: SetStorageSpy;
};

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy();
  const sut = new LocalSaveAccessToken(setStorageSpy);
  return { sut, setStorageSpy };
};

describe("LocalSaveAccessToken", () => {
  test("Should call SetStorage with correct value", async () => {
    const { sut, setStorageSpy } = makeSut();
    const accessToken = faker.string.uuid();
    await sut.save(accessToken);
    expect(setStorageSpy.key).toBe("@4Devs:accessToken");
    expect(setStorageSpy.value).toBe(accessToken);
  });
});
