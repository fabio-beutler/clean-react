import axios from "axios";
import type { Mocked } from "vitest";

import { mockPostRequest } from "@/data/test";
import { AxiosHttpClient } from "@/infra/http/axiosHttpClient";
import { mockAxios } from "@/infra/test";

vi.mock("axios");

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: Mocked<typeof axios>;
  mockedAxiosResult: { data: string; status: number };
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const { mockedAxios, mockedAxiosResult } = mockAxios();
  return { sut, mockedAxios, mockedAxiosResult };
};

describe("AxiosHttpClient", () => {
  test("Should call axios with correct values", async () => {
    const request = mockPostRequest();
    const { sut, mockedAxios } = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test("Should return the correct statusCode and body", async () => {
    const { sut, mockedAxiosResult } = makeSut();
    const httpResponse = await sut.post(mockPostRequest());
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data,
    });
  });
});
