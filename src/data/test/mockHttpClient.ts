import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode,
} from "@/data/protocols/http";

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
