import { HttpResponse } from "@/data/protocols/http";

export type HttpPostParams<T> = {
  url: string;
  body?: T;
};

export interface HttpPostClient<BodyParam, BodyResponse> {
  post(params: HttpPostParams<BodyParam>): Promise<HttpResponse<BodyResponse>>;
}
