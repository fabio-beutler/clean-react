import { faker } from "@faker-js/faker";

import { AccountModel } from "@/domain/models/account";
import { AuthenticationParams } from "@/domain/useCases/authentication";

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.string.uuid(),
});
