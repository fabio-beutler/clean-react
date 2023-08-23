import { AccountModel } from "@/domain/models";
import { mockAccountModel } from "@/domain/test";
import { AddAccount, AddAccountParams } from "@/domain/useCases";

export class AddAccountSpy implements AddAccount {
  account: AccountModel = mockAccountModel();
  params: AddAccountParams = {} as AddAccountParams;
  callsCount: number = 0;
  async add(params: AddAccountParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.account);
  }
}
