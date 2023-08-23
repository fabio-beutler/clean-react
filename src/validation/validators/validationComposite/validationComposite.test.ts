import { faker } from "@faker-js/faker";

import { FieldValidationSpy } from "@/validation/test";

import { ValidationComposite } from "./validationComposite";

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationSpyList: FieldValidationSpy[];
};

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationSpyList = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ];
  const sut = ValidationComposite.build(fieldValidationSpyList);
  return {
    sut,
    fieldValidationSpyList,
  };
};

describe("ValidationComposite", () => {
  test("Should return first error if any validation fails", () => {
    const fieldName = faker.database.column();
    const { sut, fieldValidationSpyList } = makeSut(fieldName);
    const errorMessage = faker.word.sample();
    fieldValidationSpyList[0].error = new Error(errorMessage);
    fieldValidationSpyList[1].error = new Error(faker.word.sample());
    const error = sut.validate(fieldName, { [fieldName]: faker.word.sample() });
    expect(error).toBe(errorMessage);
  });

  test("Should return falsy if no error was found", () => {
    const fieldName = faker.database.column();
    const { sut } = makeSut(fieldName);
    const error = sut.validate(fieldName, { [fieldName]: faker.word.sample() });
    expect(error).toBeFalsy();
  });
});
