import { mockAccountModel } from "@/domain/test";
import { AddAccount } from "@/domain/useCases";

export class AddAccountSpy implements AddAccount {
  account: AddAccount.Model = mockAccountModel();
  params: AddAccount.Params = {} as AddAccount.Params;
  callsCount: number = 0;
  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.account);
  }
}
