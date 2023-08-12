import { FieldValidationSpy } from "@/validation/test/mockFieldValidation";

import { ValidationComposite } from "./validationComposite";

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationSpyList: FieldValidationSpy[];
};

const makeSut = (): SutTypes => {
  const fieldValidationSpyList = [
    new FieldValidationSpy("any_field"),
    new FieldValidationSpy("any_field"),
  ];
  const sut = new ValidationComposite(fieldValidationSpyList);
  return {
    sut,
    fieldValidationSpyList,
  };
};

describe("ValidationComposite", () => {
  test("Should return first error if any validation fails", () => {
    const { sut, fieldValidationSpyList } = makeSut();
    fieldValidationSpyList[0].error = new Error("first_error_message");
    fieldValidationSpyList[1].error = new Error("second_error_message");
    const error = sut.validate("any_field", "any_value");
    expect(error).toBe("first_error_message");
  });
});
