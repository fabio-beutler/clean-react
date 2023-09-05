import axios, { AxiosResponse } from "axios";

import {
  HttpGetClient,
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode,
} from "@/data/protocols/http";

export class AxiosHttpClient implements HttpPostClient, HttpGetClient {
  async post(params: HttpPostParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.post(params.url, params.body);
      return this.adapt(axiosResponse);
    } catch (error: any) {
      if (!error.response)
        return {
          statusCode: HttpStatusCode.serverError,
          body: null,
        };
      axiosResponse = error.response;
    }
    return this.adapt(axiosResponse);
  }

  async get(params: HttpGetParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.get(params.url);
      return this.adapt(axiosResponse);
    } catch (error: any) {
      if (!error.response)
        return {
          statusCode: HttpStatusCode.serverError,
          body: null,
        };
      axiosResponse = error.response;
    }
    return this.adapt(axiosResponse);
  }

  private adapt(axiosResponse: AxiosResponse): HttpResponse {
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
