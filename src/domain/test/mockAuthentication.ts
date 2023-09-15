import { faker } from "@faker-js/faker";

import { Authentication } from "@/domain/useCases";

export const mockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
