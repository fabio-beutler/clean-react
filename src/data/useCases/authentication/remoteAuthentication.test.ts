import { describe, test, expect } from "vitest";
import { HttpPostClient } from "@/data/protocols/http/httpPostClient";
import { RemoteAuthentication } from "./remoteAuthentication";

describe("RemoteAuthentication", () => {
  test("Should call HttpClient with correct URL", async () => {
    class HttpClientSpy implements HttpPostClient {
      url?: string;
      async post(url: string): Promise<void> {
        this.url = url;
      }
    }

    const url = "any_url";
    const httpPostClientSpy = new HttpClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    await sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
