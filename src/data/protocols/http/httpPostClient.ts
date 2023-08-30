import { HttpResponse } from "@/data/protocols/http";

export type HttpPostParams<T = any> = {
  url: string;
  body?: T;
};

export interface HttpPostClient<BodyParam = any, BodyResponse = any> {
  post(params: HttpPostParams<BodyParam>): Promise<HttpResponse<BodyResponse>>;
}
