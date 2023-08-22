import { AccountModel } from "@/domain/models";
import { mockAccountModel } from "@/domain/test";
import { AddAccount, AddAccountParams } from "@/domain/useCases";

export class AddAccountSpy implements AddAccount {
  params: AddAccountParams = {} as AddAccountParams;
  async add(params: AddAccountParams): Promise<AccountModel> {
    this.params = params;
    return Promise.resolve(mockAccountModel());
  }
}
