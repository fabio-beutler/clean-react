import { ValidationBuilder, ValidationComposite } from "@/validation";

import makeLoginValidation from "./loginValidationFactory";

describe("LoginValidationFactory", () => {
  test("Should make ValidationComposite with correct validations", () => {
    const sut = makeLoginValidation();
    expect(sut).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field("email").email().required().build(),
        ...ValidationBuilder.field("password").required().min(5).build(),
      ]),
    );
  });
});
