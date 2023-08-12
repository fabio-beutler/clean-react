import { RemoteAuthentication } from "@/data/useCases/authentication";
import { Authentication } from "@/domain/useCases";
import { makeApiUrl, makeAxiosHttpClient } from "@/main/factories";

const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl("/login"), makeAxiosHttpClient());
};

export default makeRemoteAuthentication;
