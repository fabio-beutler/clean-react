import { ValidationBuilder, ValidationComposite } from "@/validation";

const makeLoginValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field("email").email().required().build(),
    ...ValidationBuilder.field("password").required().min(5).build(),
  ]);
};

export default makeLoginValidation;
