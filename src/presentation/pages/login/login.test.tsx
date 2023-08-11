import { faker } from "@faker-js/faker";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import { InvalidCredentialsError } from "@/domain/errors";
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
    { wrapper: MemoryRouterProvider },
  );
  return { sut, authenticationSpy };
};

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password(),
): void => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);
  const submitForm = sut.getByTestId("form");
  fireEvent.submit(submitForm);
};
const populateEmailField = (
  sut: RenderResult,
  email = faker.internet.email(),
): void => {
  const emailInput = sut.getByTestId("email");
  fireEvent.input(emailInput, {
    target: { value: email },
  });
};
const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.password(),
): void => {
  const passwordInput = sut.getByTestId("password");
  fireEvent.input(passwordInput, {
    target: { value: password },
  });
};
const simulateStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
): void => {
  const element = sut.getByTestId(`${fieldName}-status`);
  expect(element.title).toBe(validationError || "Tudo certo!");
  expect(element.textContent).toBe(validationError ? "🔴" : "🟢");
};

describe("Login Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(cleanup);

  test("Should start with initial state", () => {
    const validationError = faker.word.sample();
    const { sut } = makeSut({ validationError });
    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
    simulateStatusForField(sut, "email", validationError);
    simulateStatusForField(sut, "password", validationError);
  });

  test("Should show email error if Validation fails", () => {
    const validationError = faker.word.sample();
    const { sut } = makeSut({ validationError });
    populateEmailField(sut);
    simulateStatusForField(sut, "email", validationError);
  });

  test("Should show password error if Validation fails", () => {
    const validationError = faker.word.sample();
    const { sut } = makeSut({ validationError });
    populatePasswordField(sut);
    simulateStatusForField(sut, "password", validationError);
  });

  test("Should show valid email state if Validation succeeds", () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    simulateStatusForField(sut, "email");
  });

  test("Should show valid password state if Validation succeeds", () => {
    const { sut } = makeSut();
    populatePasswordField(sut);
    simulateStatusForField(sut, "password");
  });

  test("Should enable submit formButton if login is valid", () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    populatePasswordField(sut);
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test("Should show spinner on submit", () => {
    const { sut } = makeSut();
    simulateValidSubmit(sut);
    const spinner = sut.getByTestId("spinner");
    expect(spinner).toBeTruthy();
  });

  test("Should call Authentication with correct values", () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(sut, email, password);
    expect(authenticationSpy.params).toEqual({ email, password });
  });

  test("Should call Authentication only once", () => {
    const { sut, authenticationSpy } = makeSut();
    simulateValidSubmit(sut);
    simulateValidSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(1);
  });

  test("Should not call if login is invalid", () => {
    const validationError = faker.word.sample();
    const { sut, authenticationSpy } = makeSut({ validationError });
    populateEmailField(sut);
    fireEvent.submit(sut.getByTestId("form"));
    expect(authenticationSpy.callsCount).toBe(0);
  });

  test("Should present error if Authentication fails", async () => {
    const { sut, authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    vi.spyOn(authenticationSpy, "auth").mockReturnValueOnce(
      Promise.reject(error),
    );
    simulateValidSubmit(sut);
    await waitFor(() => sut.getByTestId("error-wrap"));
    const mainError = sut.getByTestId("main-error");
    expect(mainError.textContent).toBe(error.message);
    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(1);
  });

  test("Should add accessToken to localstorage on success", async () => {
    const { sut, authenticationSpy } = makeSut();
    simulateValidSubmit(sut);
    await waitFor(() => sut.getByTestId("form"));
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "accessToken",
      authenticationSpy.account.accessToken,
    );
    expect(mockRouter.asPath).toEqual("/");
  });

  test("Should go to signup page", async () => {
    const { sut } = makeSut();
    const register = sut.getByTestId("signUp");
    fireEvent.click(register);
    expect(mockRouter.asPath).toEqual("/signUp");
  });
});
