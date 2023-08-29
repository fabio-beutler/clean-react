import { faker } from "@faker-js/faker";

import * as Helper from "./httpMocks";

export const mockInvalidCredentialsError = () => {
  return Helper.mockInvalidCredentialsError(/login/);
};

export const mockUnexpectedError = () => {
  return Helper.mockUnexpectedError(/login/);
};

export const mockOk = () => {
  return Helper.mockOk(/login/, {
    accessToken: faker.string.uuid(),
  });
};

export const mockInvalidData = () => {
  return Helper.mockOk(/login/, {
    invalid: faker.string.uuid(),
  });
};
