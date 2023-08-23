import { RemoteAddAccount } from "@/data/useCases/addAccount";
import { AddAccount } from "@/domain/useCases";
import { makeApiUrl, makeAxiosHttpClient } from "@/main/factories";

const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeApiUrl("/signup"), makeAxiosHttpClient());
};

export default makeRemoteAddAccount;
