import { faker } from "@faker-js/faker";

import { InvalidFieldError } from "@/validation/errors";

import { EmailValidation } from "./emailValidation";

const makeSut = (): EmailValidation =>
  new EmailValidation(faker.database.column());
describe("EmailValidation", () => {
  test("Should return error if email is invalid", () => {
    const sut = makeSut();
    const error = sut.validate(faker.word.sample());
    expect(error).toEqual(new InvalidFieldError());
  });

  test("Should return falsy if email is valid", () => {
    const sut = makeSut();
    const error = sut.validate(faker.internet.email());
    expect(error).toBeFalsy();
  });
});
