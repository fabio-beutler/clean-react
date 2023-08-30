import * as Helper from "./httpMocks";

export const mockEmailInUseError = () => {
  return Helper.mockEmailInUseError(/signup/);
};
