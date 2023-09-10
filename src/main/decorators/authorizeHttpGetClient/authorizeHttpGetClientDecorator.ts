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
  get(params: HttpGetParams): Promise<HttpResponse> {
    this.getStorage.get(ACCOUNT_STORAGE_KEY);
    this.httpGetClient.get(params);
    return null;
  }
}
