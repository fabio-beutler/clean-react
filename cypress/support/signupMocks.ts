import * as Helper from "./httpMocks";

export const mockEmailInUseError = () => {
  return Helper.mockEmailInUseError(/signup/);
};

export const mockUnexpectedError = () => {
  return Helper.mockUnexpectedError(/signup/);
};
