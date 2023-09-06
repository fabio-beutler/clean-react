import { faker } from "@faker-js/faker";

import { InvalidFieldError } from "@/validation/errors";

import { CompareFieldsValidation } from "./compareFieldsValidation";

const makeSut = (fieldToCompare: string): CompareFieldsValidation =>
  new CompareFieldsValidation(faker.database.column(), fieldToCompare);
describe("CompareFieldsValidation", () => {
  test("Should return error if compare is invalid", () => {
    const fieldToCompare = faker.database.column();
    const sut = makeSut(fieldToCompare);
    const error = sut.validate({
      [sut.field]: faker.word.words(3),
      [fieldToCompare]: faker.word.words(4),
    });
    expect(error).toEqual(new InvalidFieldError());
  });

  test("Should return falsy if compare is valid", () => {
    const fieldToCompare = faker.word.sample();
    const value = faker.word.sample();
    const sut = makeSut(fieldToCompare);
    const error = sut.validate({
      [sut.field]: value,
      [fieldToCompare]: value,
    });
    expect(error).toBeFalsy();
  });
});
