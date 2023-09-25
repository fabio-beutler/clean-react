import { mockAccountModel } from "@/domain/test";
import { Authentication } from "@/domain/useCases";

export class AuthenticationSpy implements Authentication {
  account: Authentication.Model = mockAccountModel();
  params: Authentication.Params = {} as Authentication.Params;
  callsCount: number = 0;
  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.account);
  }
}
