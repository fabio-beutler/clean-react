import { ValidationBuilder, ValidationComposite } from "@/validation";

import makeLoginValidation from "./signupValidationFactory";

describe("SignupValidationFactory", () => {
  test("Should make ValidationComposite with correct validations", () => {
    const sut = makeLoginValidation();
    expect(sut).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field("name").required().min(3).build(),
        ...ValidationBuilder.field("email").email().required().build(),
        ...ValidationBuilder.field("password").required().min(5).build(),
        ...ValidationBuilder.field("passwordConfirmation")
          .required()
          .sameAs("password")
          .build(),
      ]),
    );
  });
});
