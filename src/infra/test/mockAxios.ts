import { faker } from "@faker-js/faker";
import axios from "axios";
import { Mocked } from "vitest";

type MockedAxios = {
  mockedAxios: Mocked<typeof axios>;
  mockedAxiosResult: { data: string; status: number };
};

export const mockAxios = (): MockedAxios => {
  const mockedAxios = axios as Mocked<typeof axios>;
  const mockedAxiosResult = {
    data: faker.string.sample(),
    status: faker.internet.httpStatusCode(),
  };
  mockedAxios.post.mockResolvedValue(mockedAxiosResult);
  mockedAxios.get.mockResolvedValue(mockedAxiosResult);
  return { mockedAxios, mockedAxiosResult };
};
