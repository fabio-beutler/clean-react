import { faker } from "@faker-js/faker";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import { EmailInUseError } from "@/domain/errors";
import { AddAccount } from "@/domain/useCases";
import {
  AddAccountSpy,
  Helper,
  MockApiContextProvider,
  ValidationStub,
} from "@/presentation/test";

import Signup from "./Signup";

type SutTypes = {
  addAccountSpy: AddAccountSpy;
  setCurrentAccountMock: (account: AddAccount.Model) => void;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const addAccountSpy = new AddAccountSpy();
  const setCurrentAccountMock = vi.fn();
  validationStub.errorMessage = params?.validationError || "";
  render(
    <MockApiContextProvider setCurrentAccount={setCurrentAccountMock}>
      <Signup validation={validationStub} addAccount={addAccountSpy} />
    </MockApiContextProvider>,
    { wrapper: MemoryRouterProvider },
  );
  return { addAccountSpy, setCurrentAccountMock };
};

const simulateValidSubmit = async (
  name = faker.person.firstName(),
  email = faker.internet.email(),
  password = faker.internet.password(),
): Promise<void> => {
  Helper.populateField("name", name);
  Helper.populateField("email", email);
  Helper.populateField("password", password);
  Helper.populateField("passwordConfirmation", password);
  const form = screen.getByTestId("form");
  fireEvent.submit(form);
  await waitFor(() => form);
};

describe("Signup Component", () => {
  test("Should start with initial state", () => {
    const validationError = faker.word.sample();
    makeSut({ validationError });
    expect(screen.getByTestId("error-wrap").children).toHaveLength(0);
    expect(screen.getByTestId("submit")).toBeDisabled();
    Helper.testStatusForField("name", validationError);
    Helper.testStatusForField("email", validationError);
    Helper.testStatusForField("password", validationError);
    Helper.testStatusForField("passwordConfirmation", validationError);
  });

  test("Should show name error if Validation fails", () => {
    const validationError = faker.word.sample();
    makeSut({ validationError });
    Helper.populateField("name");
    Helper.testStatusForField("name", validationError);
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

  test("Should show passwordConfirmation error if Validation fails", () => {
    const validationError = faker.word.sample();
    makeSut({ validationError });
    Helper.populateField("passwordConfirmation");
    Helper.testStatusForField("passwordConfirmation", validationError);
  });

  test("Should show valid name state if Validation succeeds", () => {
    makeSut();
    Helper.populateField("name");
    Helper.testStatusForField("name");
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

  test("Should show valid passwordConfirmation state if Validation succeeds", () => {
    makeSut();
    Helper.populateField("passwordConfirmation");
    Helper.testStatusForField("passwordConfirmation");
  });

  test("Should enable submit formButton if login is valid", () => {
    makeSut();
    Helper.populateField("name");
    Helper.populateField("email");
    Helper.populateField("password");
    Helper.populateField("passwordConfirmation");
    expect(screen.getByTestId("submit")).toBeEnabled();
  });

  test("Should show spinner on submit", async () => {
    makeSut();
    await simulateValidSubmit();
    expect(screen.queryByTestId("spinner")).toBeInTheDocument();
  });

  test("Should call AddAccount with correct values", async () => {
    const { addAccountSpy } = makeSut();
    const name = faker.internet.email();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSubmit(name, email, password);
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    });
  });

  test("Should call AddAccount only once", async () => {
    const { addAccountSpy } = makeSut();
    await simulateValidSubmit();
    await simulateValidSubmit();
    expect(addAccountSpy.callsCount).toBe(1);
  });

  test("Should not call AddAccount if form is invalid", async () => {
    const validationError = faker.word.sample();
    const { addAccountSpy } = makeSut({ validationError });
    await simulateValidSubmit();
    expect(addAccountSpy.callsCount).toBe(0);
  });

  test("Should present error if AddAccount fails", async () => {
    const { addAccountSpy } = makeSut();
    const error = new EmailInUseError();
    vi.spyOn(addAccountSpy, "add").mockRejectedValueOnce(error);
    await simulateValidSubmit();
    expect(screen.getByTestId("main-error")).toHaveTextContent(error.message);
    expect(screen.getByTestId("error-wrap").children).toHaveLength(1);
  });

  test("Should call setCurrentAccount on success", async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut();
    await simulateValidSubmit();
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account);
    expect(mockRouter.asPath).toEqual("/");
  });

  test("Should go to login page", async () => {
    makeSut();
    const loginLink = screen.getByTestId("login-link");
    fireEvent.click(loginLink);
    expect(mockRouter.asPath).toEqual("/login");
  });
});
