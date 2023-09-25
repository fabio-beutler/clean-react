import { ValidationComposite } from "@/validation";
import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from "@/validation/validators";

import makeLoginValidation from "./loginValidationFactory";

describe("LoginValidationFactory", () => {
  test("Should make ValidationComposite with correct validations", () => {
    const sut = makeLoginValidation();
    expect(sut).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation("email"),
        new EmailValidation("email"),
        new RequiredFieldValidation("password"),
        new MinLengthValidation("password", 5),
      ]),
    );
  });
});
