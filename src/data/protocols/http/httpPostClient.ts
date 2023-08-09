import {
  HttpResponse
} from "@/data/protocols/http/httpResponse";

export type HttpPostParams = {
  url: string;
  body?: object;
};

export interface HttpPostClient {
  post(params: HttpPostParams): Promise<HttpResponse>;
}
