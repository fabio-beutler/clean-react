import { faker } from "@faker-js/faker";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import { AuthenticationSpy, ValidationStub } from "@/presentation/test";

import Login from "./Login";

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError || "";
  const sut = render(
    <Login validation={validationStub} authentication={authenticationSpy} />,
  );
  return { sut, authenticationSpy };
};

describe("Login Component", () => {
  afterEach(cleanup);

  test("Should start with initial state", () => {
    const validationError = faker.word.sample();
    const { sut } = makeSut({ validationError });
    const errorWrap = sut.getByTestId("error-wrap") as HTMLDivElement;
    expect(errorWrap.childElementCount).toBe(0);
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
    const emailStatus = sut.getByTestId("email-status") as HTMLSpanElement;
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe("🔴");
    const passwordStatus = sut.getByTestId(
      "password-status",
    ) as HTMLSpanElement;
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe("🔴");
  });

  test("Should show email error if Validation fails", () => {
    const validationError = faker.word.sample();
    const { sut } = makeSut({ validationError });
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe("🔴");
  });

  test("Should show password error if Validation fails", () => {
    const validationError = faker.word.sample();
    const { sut } = makeSut({ validationError });
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe("🔴");
  });

  test("Should show valid email state if Validation succeeds", () => {
    const { sut } = makeSut();
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe("Tudo certo!");
    expect(emailStatus.textContent).toBe("🟢");
  });

  test("Should show valid password state if Validation succeeds", () => {
    const { sut } = makeSut();
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe("Tudo certo!");
    expect(passwordStatus.textContent).toBe("🟢");
  });

  test("Should enable submit formButton if form is valid", () => {
    const { sut } = makeSut();
    const emailInput = sut.getByTestId("email");
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test("Should show spinner on submit", () => {
    const { sut } = makeSut();
    const emailInput = sut.getByTestId("email");
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const submitForm = sut.getByTestId("form");
    fireEvent.submit(submitForm);
    const spinner = sut.getByTestId("spinner");
    expect(spinner).toBeTruthy();
  });

  test("Should call Authentication with correct values", () => {
    const { sut, authenticationSpy } = makeSut();
    const emailInput = sut.getByTestId("email");
    const passwordInput = sut.getByTestId("password");
    const email = faker.internet.email();
    const password = faker.internet.password();
    fireEvent.input(emailInput, {
      target: { value: email },
    });
    fireEvent.input(passwordInput, {
      target: { value: password },
    });
    const submitForm = sut.getByTestId("form");
    fireEvent.submit(submitForm);
    expect(authenticationSpy.params).toEqual({ email, password });
  });
});
