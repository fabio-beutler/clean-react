import { faker } from "@faker-js/faker";
import axios from "axios";
import { describe, expect, Mocked, test, vi } from "vitest";

import { AxiosHttpClient } from "@/infra/http/axiosHttpClient/axiosHttpClient";

vi.mock("axios");
const mockedAxios = axios as Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

describe("AxiosHttpClient", () => {
  test("Should call axios with correct URL", async () => {
    const url = faker.internet.url();
    const sut = makeSut();
    await sut.post({ url });
    expect(mockedAxios).toHaveBeenCalledWith(url);
  });
});
