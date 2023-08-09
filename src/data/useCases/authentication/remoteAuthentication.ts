import { HttpPostClient } from "@/data/protocols/http/httpPostClient";
import { HttpStatusCode } from "@/data/protocols/http/httpResponse";
import { InvalidCredentialsError } from "@/domain/errors/InvalidCredentialsError";
import { UnexpectedError } from "@/domain/errors/UnexpectedError";
import { AccountModel } from "@/domain/models/account";
import {
  Authentication,
  AuthenticationParams,
} from "@/domain/useCases/authentication";

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationParams,
      AccountModel
    >,
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        if (!httpResponse.body) throw new UnexpectedError();
        return httpResponse.body;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      case HttpStatusCode.badRequest:
        throw new UnexpectedError();
      default:
        throw new UnexpectedError();
    }
  }
}
