import { faker } from "@faker-js/faker";

import * as Helper from "./httpMocks";

export const mockEmailInUseError = () => {
  return Helper.mockEmailInUseError(/signup/);
};

export const mockUnexpectedError = () => {
  return Helper.mockUnexpectedError(/signup/);
};

export const mockInvalidData = () => {
  return Helper.mockOk(/signup/, {
    invalid: faker.string.uuid(),
  });
};
