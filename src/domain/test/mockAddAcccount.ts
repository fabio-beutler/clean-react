import { faker } from "@faker-js/faker";

import { AddAccountParams } from "@/domain/useCases";

export const mockAddAccount = (): AddAccountParams => {
  const password = faker.internet.password();
  return {
    name: faker.internet.displayName(),
    email: faker.internet.email(),
    password: password,
    passwordConfirmation: password,
  };
};
