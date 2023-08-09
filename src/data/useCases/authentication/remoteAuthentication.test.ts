import { describe, test, expect } from "vitest";
import { RemoteAuthentication } from "./remoteAuthentication";
import { HttpPostClientSpy } from "../../test/mockHttpClient";

describe("RemoteAuthentication", () => {
  test("Should call HttpClient with correct URL", async () => {
    const url = "any_url";
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    await sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
