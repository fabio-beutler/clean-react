import axios, { AxiosResponse } from "axios";

import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode,
} from "@/data/protocols/http";

export class AxiosHttpClient implements HttpPostClient {
  async post(params: HttpPostParams): Promise<HttpResponse> {
    let httpResponse: AxiosResponse;
    try {
      httpResponse = await axios.post(params.url, params.body);
      return {
        statusCode: httpResponse.status,
        body: httpResponse.data,
      };
    } catch (error: any) {
      if (!error.response)
        return {
          statusCode: HttpStatusCode.serverError,
          body: null,
        };
      httpResponse = error.response;
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}
