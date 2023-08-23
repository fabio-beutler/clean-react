import { faker } from "@faker-js/faker";

import { RequiredFieldError } from "@/validation/errors";

import { RequiredFieldValidation } from "./requiredFieldValidation";

const makeSut = (): RequiredFieldValidation =>
  new RequiredFieldValidation(faker.database.column());
describe("RequiredFieldValidation", () => {
  test("Should return error if field is empty", () => {
    const sut = makeSut();
    const error = sut.validate({ [sut.field]: "" });
    expect(error).toEqual(new RequiredFieldError());
  });

  test("Should return falsy if field is not empty", () => {
    const sut = makeSut();
    const error = sut.validate({ [sut.field]: faker.word.sample() });
    expect(error).toBeFalsy();
  });
});
