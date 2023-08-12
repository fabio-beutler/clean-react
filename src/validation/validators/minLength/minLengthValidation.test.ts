import { faker } from "@faker-js/faker";

import { InvalidFieldError } from "@/validation/errors";

import { MinLengthValidation } from "./minLengthValidation";

const makeSut = (minLength: number): MinLengthValidation =>
  new MinLengthValidation(faker.database.column(), minLength);
describe("MinLengthValidation", () => {
  test("Should return error if value is invalid", () => {
    const sut = makeSut(2);
    const error = sut.validate(faker.string.sample(1));
    expect(error).toEqual(new InvalidFieldError());
  });

  test("Should return falsy if value is valid", () => {
    const sut = makeSut(2);
    const error = sut.validate(faker.string.sample(2));
    expect(error).toBeFalsy();
  });
});
