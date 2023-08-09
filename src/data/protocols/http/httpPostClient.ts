import { HttpResponse } from "@/data/protocols/http/httpResponse";

export type HttpPostParams<T> = {
  url: string;
  body?: T;
};

export interface HttpPostClient<BodyParam, BodyResponse> {
  post(params: HttpPostParams<BodyParam>): Promise<HttpResponse<BodyResponse>>;
}
