import { ValidationBuilder, ValidationComposite } from "@/validation";

const makeSignupValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field("name").required().min(3).build(),
    ...ValidationBuilder.field("email").email().required().build(),
    ...ValidationBuilder.field("password").required().min(5).build(),
    ...ValidationBuilder.field("passwordConfirmation")
      .required()
      .min(5)
      .build(),
  ]);
};

export default makeSignupValidation;
