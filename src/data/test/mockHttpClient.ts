import {
  HttpPostClient,
  HttpPostParams,
} from "@/data/protocols/http/httpPostClient";
import {
  HttpResponse,
  HttpStatusCode,
} from "@/data/protocols/http/httpResponse";

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
