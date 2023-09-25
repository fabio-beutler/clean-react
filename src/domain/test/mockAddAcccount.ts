import { faker } from "@faker-js/faker";

import { AddAccount } from "@/domain/useCases";

export const mockAddAccount = (): AddAccount.Params => {
  const password = faker.internet.password();
  return {
    name: faker.internet.displayName(),
    email: faker.internet.email(),
    password: password,
    passwordConfirmation: password,
  };
};
