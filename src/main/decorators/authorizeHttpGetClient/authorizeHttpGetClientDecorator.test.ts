import { GetStorageSpy, mockGetRequest } from "@/data/test";
import { ACCOUNT_STORAGE_KEY } from "@/main/config";

import { AuthorizeHttpGetClientDecorator } from "./authorizeHttpGetClientDecorator";

describe("AuthorizeHttpGetClient", () => {
  test("Should class GetStorage with correct value", () => {
    const getStorageSpy = new GetStorageSpy();
    const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy);
    sut.get(mockGetRequest());
    expect(getStorageSpy.key).toBe(ACCOUNT_STORAGE_KEY);
  });
});
