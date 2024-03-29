import { faker } from "@faker-js/faker";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import { InvalidCredentialsError } from "@/domain/errors";
import { Authentication } from "@/domain/useCases";
import {
  AuthenticationSpy,
  Helper,
  MockApiContextProvider,
  ValidationStub,
} from "@/presentation/test";

import Login from "./Login";

type SutTypes = {
  authenticationSpy: AuthenticationSpy;
  setCurrentAccountMock: (account: Authentication.Model) => void;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  const setCurrentAccountMock = vi.fn();
  validationStub.errorMessage = params?.validationError || "";
  render(
    <MockApiContextProvider setCurrentAccount={setCurrentAccountMock}>
      <Login validation={validationStub} authentication={authenticationSpy} />
    </MockApiContextProvider>,
    { wrapper: MemoryRouterProvider },
  );
  return { authenticationSpy, setCurrentAccountMock };
};

const simulateValidSubmit = async (
  email = faker.internet.email(),
  password = faker.internet.password(),
): Promise<void> => {
  Helper.populateField("email", email);
  Helper.populateField("password", password);
  const form = screen.getByTestId("form");
  fireEvent.submit(form);
  await waitFor(() => form);
};

describe("Login Component", () => {
  test("Should start with initial state", () => {
    const validationError = faker.word.sample();
    makeSut({ validationError });
    expect(screen.getByTestId("error-wrap").children).toHaveLength(0);
    expect(screen.getByTestId("submit")).toBeDisabled();
    Helper.testStatusForField("email", validationError);
    Helper.testStatusForField("password", validationError);
  });

  test("Should show email error if Validation fails", () => {
    const validationError = faker.word.sample();
    makeSut({ validationError });
    Helper.populateField("email");
    Helper.testStatusForField("email", validationError);
  });

  test("Should show password error if Validation fails", () => {
    const validationError = faker.word.sample();
    makeSut({ validationError });
    Helper.populateField("password");
    Helper.testStatusForField("password", validationError);
  });

  test("Should show valid email state if Validation succeeds", () => {
    makeSut();
    Helper.populateField("email");
    Helper.testStatusForField("email");
  });

  test("Should show valid password state if Validation succeeds", () => {
    makeSut();
    Helper.populateField("password");
    Helper.testStatusForField("password");
  });

  test("Should enable submit formButton if login is valid", () => {
    makeSut();
    Helper.populateField("email");
    Helper.populateField("password");
    expect(screen.getByTestId("submit")).toBeEnabled();
  });

  test("Should show spinner on submit", async () => {
    makeSut();
    await simulateValidSubmit();
    expect(screen.queryByTestId("spinner")).toBeInTheDocument();
  });

  test("Should call Authentication with correct values", async () => {
    const { authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSubmit(email, password);
    expect(authenticationSpy.params).toEqual({ email, password });
  });

  test("Should call Authentication only once", async () => {
    const { authenticationSpy } = makeSut();
    await simulateValidSubmit();
    await simulateValidSubmit();
    expect(authenticationSpy.callsCount).toBe(1);
  });

  test("Should not call Authentication if form is invalid", async () => {
    const validationError = faker.word.sample();
    const { authenticationSpy } = makeSut({ validationError });
    await simulateValidSubmit();
    expect(authenticationSpy.callsCount).toBe(0);
  });

  test("Should present error if Authentication fails", async () => {
    const { authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    vi.spyOn(authenticationSpy, "auth").mockRejectedValueOnce(error);
    await simulateValidSubmit();
    expect(screen.getByTestId("main-error")).toHaveTextContent(error.message);
    expect(screen.getByTestId("error-wrap").children).toHaveLength(1);
  });

  test("Should call setCurrentAccount on success", async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut();
    await simulateValidSubmit();
    expect(setCurrentAccountMock).toHaveBeenCalledWith(
      authenticationSpy.account,
    );
    expect(mockRouter.asPath).toEqual("/");
  });

  test("Should go to signup page", async () => {
    makeSut();
    const signupLink = screen.getByTestId("signup-link");
    fireEvent.click(signupLink);
    expect(mockRouter.asPath).toEqual("/signup");
  });
});
