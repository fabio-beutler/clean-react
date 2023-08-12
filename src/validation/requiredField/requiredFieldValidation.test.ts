import { Validation } from "@/presentation/protocols";
import { RequiredFieldError } from "@/validation/errors";

import { RequiredFieldValidation } from "./requiredFieldValidation";

describe("RequiredFieldValidation", () => {
  test("Should return error if field is empty", () => {
    const sut = new RequiredFieldValidation("email");
    const error = sut.validate("");
    expect(error).toEqual(new RequiredFieldError());
  });
});
