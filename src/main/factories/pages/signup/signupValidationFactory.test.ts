import { ValidationComposite } from "@/validation";
import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from "@/validation/validators";
import { CompareFieldsValidation } from "@/validation/validators/compareFields/compareFieldsValidation";

import makeLoginValidation from "./signupValidationFactory";

describe("SignupValidationFactory", () => {
  test("Should make ValidationComposite with correct validations", () => {
    const sut = makeLoginValidation();
    expect(sut).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation("name"),
        new MinLengthValidation("name", 3),
        new RequiredFieldValidation("email"),
        new EmailValidation("email"),
        new RequiredFieldValidation("password"),
        new MinLengthValidation("password", 5),
        new RequiredFieldValidation("passwordConfirmation"),
        new CompareFieldsValidation("passwordConfirmation", "password"),
      ]),
    );
  });
});
