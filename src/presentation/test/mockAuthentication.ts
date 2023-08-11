import { AccountModel } from "@/domain/models";
import { mockAccountModel } from "@/domain/test";
import { Authentication, AuthenticationParams } from "@/domain/useCases";

export class AuthenticationSpy implements Authentication {
  account: AccountModel = mockAccountModel();
  params: AuthenticationParams = {} as AuthenticationParams;
  callsCount: number = 0;
  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.account);
  }
}