import { HttpResponse } from "@/data/protocols/http";

export type HttpGetParams = {
  url: string;
  headers?: Record<string, any>;
};

export interface HttpGetClient<BodyResponse = any> {
  get(params: HttpGetParams): Promise<HttpResponse<BodyResponse>>;
}
