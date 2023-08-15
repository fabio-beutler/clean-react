import { faker } from "@faker-js/faker";

import { SetStorageSpy } from "@/data/test";

import { LocalSaveAccessToken } from "./localSaveAccessToken";

describe("LocalSaveAccessToken", () => {
  test("Should call SetStorage with correct value", async () => {
    const setStorageSpy = new SetStorageSpy();
    const sut = new LocalSaveAccessToken(setStorageSpy);
    const accessToken = faker.string.uuid();
    await sut.save(accessToken);
    expect(setStorageSpy.key).toBe("@4Devs:accessToken");
    expect(setStorageSpy.value).toBe(accessToken);
  });
});
