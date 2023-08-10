import { faker } from "@faker-js/faker";
import axios from "axios";
import { describe, expect, Mocked, test, vi } from "vitest";

import { HttpPostParams } from "@/data/protocols/http";
import { AxiosHttpClient } from "@/infra/http/axiosHttpClient/axiosHttpClient";

vi.mock("axios");
const mockedAxios = axios as Mocked<typeof axios>;
const mockedAxiosResult = {
  data: faker.string.sample(),
  status: faker.number.int(),
};
mockedAxios.post.mockResolvedValue(mockedAxiosResult);
const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.string.sample(),
});
const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

describe("AxiosHttpClient", () => {
  test("Should call axios with correct values", async () => {
    const request = mockPostRequest();
    const sut = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test("Should return the correct statusCode and body", async () => {
    const sut = makeSut();
    const httpResponse = await sut.post(mockPostRequest());
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data,
    });
  });
});
