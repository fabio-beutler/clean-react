import { faker } from "@faker-js/faker";

import {
  HttpGetClient,
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode,
} from "@/data/protocols/http";

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.string.sample(),
});

export class HttpPostClientSpy<BodyParams, BodyResponse>
  implements HttpPostClient<BodyParams, BodyResponse>
{
  url?: string;
  body?: BodyParams;
  response: HttpResponse<BodyResponse> = {
    statusCode: HttpStatusCode.ok,
  };

  async post(
    params: HttpPostParams<BodyParams>,
  ): Promise<HttpResponse<BodyResponse>> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}

export class HttpGetClientSpy<BodyResponse>
  implements HttpGetClient<BodyResponse>
{
  url?: string;
  response: HttpResponse<BodyResponse> = {
    statusCode: HttpStatusCode.ok,
  };

  async get(params: HttpGetParams): Promise<HttpResponse<BodyResponse>> {
    this.url = params.url;
    return Promise.resolve(this.response);
  }
}
