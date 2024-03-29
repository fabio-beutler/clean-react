import { GetStorage } from "@/data/protocols/cache";
import {
  HttpGetClient,
  HttpGetParams,
  HttpResponse,
} from "@/data/protocols/http";
import { ACCOUNT_STORAGE_KEY } from "@/main/config";

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient,
  ) {}
  async get(params: HttpGetParams): Promise<HttpResponse> {
    const account = this.getStorage.get(ACCOUNT_STORAGE_KEY);
    if (account?.accessToken) {
      Object.assign(params, {
        headers: {
          "x-access-token": account.accessToken,
          ...params.headers,
        },
      });
    }
    return await this.httpGetClient.get(params);
  }
}
