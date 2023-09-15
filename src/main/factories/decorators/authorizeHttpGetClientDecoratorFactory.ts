import { HttpGetClient } from "@/data/protocols/http";
import { AuthorizeHttpGetClientDecorator } from "@/main/decorators";
import { makeAxiosHttpClient, makeLocalStorageAdapter } from "@/main/factories";

export const makeAuthorizeHttpGetClientDecorator = (): HttpGetClient => {
  return new AuthorizeHttpGetClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpClient(),
  );
};
