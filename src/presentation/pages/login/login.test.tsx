import { faker } from "@faker-js/faker";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import { ValidationStub } from "@/presentation/test";

import Login from "./Login";

type SutTypes = {
  sut: RenderResult;
  validationStub: ValidationStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = faker.word.sample();
  const sut = render(<Login validation={validationStub} />);
  return { sut, validationStub };
};

describe("Login Component", () => {
  afterEach(cleanup);

  test("Should start with initial state", () => {
    const { sut, validationStub } = makeSut();
    const errorWrap = sut.getByTestId("error-wrap") as HTMLDivElement;
    expect(errorWrap.childElementCount).toBe(0);
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
    const emailStatus = sut.getByTestId("email-status") as HTMLSpanElement;
    expect(emailStatus.title).toBe(validationStub.errorMessage);
    expect(emailStatus.textContent).toBe("🔴");
    const passwordStatus = sut.getByTestId(
      "password-status",
    ) as HTMLSpanElement;
    expect(passwordStatus.title).toBe(validationStub.errorMessage);
    expect(passwordStatus.textContent).toBe("🔴");
  });

  test("Should show email error if Validation fails", () => {
    const { sut, validationStub } = makeSut();
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe(validationStub.errorMessage);
    expect(emailStatus.textContent).toBe("🔴");
  });

  test("Should show password error if Validation fails", () => {
    const { sut, validationStub } = makeSut();
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.email() },
    });
    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe(validationStub.errorMessage);
    expect(passwordStatus.textContent).toBe("🔴");
  });
});