import axios from "axios";
import type { Mocked } from "vitest";

import { mockGetRequest, mockPostRequest } from "@/data/test";
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
  describe("post", () => {
    test("Should call axios.post with correct values", async () => {
      const request = mockPostRequest();
      const { sut, mockedAxios } = makeSut();
      await sut.post(request);
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
    });

    test("Should return correct response on axios.post", async () => {
      const { sut, mockedAxiosResult } = makeSut();
      const httpResponse = await sut.post(mockPostRequest());
      expect(httpResponse).toEqual({
        statusCode: mockedAxiosResult.status,
        body: mockedAxiosResult.data,
      });
    });

    test("Should return correct error on axios.post", async () => {
      const { sut, mockedAxios, mockedAxiosResult } = makeSut();
      mockedAxios.post.mockRejectedValueOnce({
        response: mockedAxiosResult,
      });
      const httpResponse = await sut.post(mockPostRequest());
      expect(httpResponse).toEqual({
        statusCode: mockedAxiosResult.status,
        body: mockedAxiosResult.data,
      });
    });

    test("Should return statusCode 500 on network failure", async () => {
      const { sut, mockedAxios } = makeSut();
      mockedAxios.post.mockRejectedValueOnce({
        response: null,
      });
      const httpResponse = await sut.post(mockPostRequest());
      expect(httpResponse).toEqual({
        statusCode: 500,
        body: null,
      });
    });
  });

  describe("get", () => {
    test("Should call axios.get with correct values", async () => {
      const request = mockGetRequest();
      const { sut, mockedAxios } = makeSut();
      await sut.get(request);
      expect(mockedAxios.get).toHaveBeenCalledWith(request.url, {
        headers: request.headers,
      });
    });

    test("Should return correct response on axios.get", async () => {
      const { sut, mockedAxiosResult } = makeSut();
      const httpResponse = await sut.get(mockGetRequest());
      expect(httpResponse).toEqual({
        statusCode: mockedAxiosResult.status,
        body: mockedAxiosResult.data,
      });
    });

    test("Should return correct error on axios.get", async () => {
      const { sut, mockedAxios, mockedAxiosResult } = makeSut();
      mockedAxios.get.mockRejectedValueOnce({
        response: mockedAxiosResult,
      });
      const httpResponse = await sut.get(mockGetRequest());
      expect(httpResponse).toEqual({
        statusCode: mockedAxiosResult.status,
        body: mockedAxiosResult.data,
      });
    });

    test("Should return statusCode 500 on network failure", async () => {
      const { sut, mockedAxios } = makeSut();
      mockedAxios.get.mockRejectedValueOnce({
        response: null,
      });
      const httpResponse = await sut.get(mockPostRequest());
      expect(httpResponse).toEqual({
        statusCode: 500,
        body: null,
      });
    });
  });
});
