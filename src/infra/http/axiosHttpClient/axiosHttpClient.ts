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
      return {
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      };
    } catch (error: any) {
      if (!error.response)
        return {
          statusCode: HttpStatusCode.serverError,
          body: null,
        };
      axiosResponse = error.response;
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }

  async get(params: HttpGetParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.get(params.url);
      return {
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      };
    } catch (error: any) {
      if (!error.response)
        return {
          statusCode: HttpStatusCode.serverError,
          body: null,
        };
      axiosResponse = error.response;
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
