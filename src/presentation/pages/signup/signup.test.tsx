import { faker } from "@faker-js/faker";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import { Helper, ValidationStub } from "@/presentation/test";

import Signup from "./Signup";

type SutTypes = {
  sut: RenderResult;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError || "";
  const sut = render(<Signup validation={validationStub} />, {
    wrapper: MemoryRouterProvider,
  });
  return { sut };
};

const simulateValidSubmit = async (
  sut: RenderResult,
  name = faker.person.firstName(),
  email = faker.internet.email(),
  password = faker.internet.password(),
): Promise<void> => {
  Helper.populateField(sut, "name", name);
  Helper.populateField(sut, "email", email);
  Helper.populateField(sut, "password", password);
  Helper.populateField(sut, "passwordConfirmation", password);
  const form = sut.getByTestId("form");
  fireEvent.submit(form);
  await waitFor(() => form);
};

const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const element = sut.getByTestId(fieldName);
  expect(element).toBeTruthy();
};

describe("Signup Component", () => {
  afterEach(cleanup);

  test("Should start with initial state", () => {
    const validationError = faker.word.sample();
    const { sut } = makeSut({ validationError });
    Helper.testChildCount(sut, "error-wrap", 0);
    Helper.testButtonIsDisabled(sut, "submit", true);
    Helper.testStatusForField(sut, "name", validationError);
    Helper.testStatusForField(sut, "email", validationError);
    Helper.testStatusForField(sut, "password", validationError);
    Helper.testStatusForField(sut, "passwordConfirmation", validationError);
  });

  test("Should show name error if Validation fails", () => {
    const validationError = faker.word.sample();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, "name");
    Helper.testStatusForField(sut, "name", validationError);
  });

  test("Should show email error if Validation fails", () => {
    const validationError = faker.word.sample();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, "email");
    Helper.testStatusForField(sut, "email", validationError);
  });

  test("Should show password error if Validation fails", () => {
    const validationError = faker.word.sample();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, "password");
    Helper.testStatusForField(sut, "password", validationError);
  });

  test("Should show passwordConfirmation error if Validation fails", () => {
    const validationError = faker.word.sample();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, "passwordConfirmation");
    Helper.testStatusForField(sut, "passwordConfirmation", validationError);
  });

  test("Should show valid name state if Validation succeeds", () => {
    const { sut } = makeSut();
    Helper.populateField(sut, "name");
    Helper.testStatusForField(sut, "name");
  });

  test("Should show valid email state if Validation succeeds", () => {
    const { sut } = makeSut();
    Helper.populateField(sut, "email");
    Helper.testStatusForField(sut, "email");
  });

  test("Should show valid password state if Validation succeeds", () => {
    const { sut } = makeSut();
    Helper.populateField(sut, "password");
    Helper.testStatusForField(sut, "password");
  });

  test("Should show valid passwordConfirmation state if Validation succeeds", () => {
    const { sut } = makeSut();
    Helper.populateField(sut, "passwordConfirmation");
    Helper.testStatusForField(sut, "passwordConfirmation");
  });

  test("Should enable submit formButton if login is valid", () => {
    const { sut } = makeSut();
    Helper.populateField(sut, "name");
    Helper.populateField(sut, "email");
    Helper.populateField(sut, "password");
    Helper.populateField(sut, "passwordConfirmation");
    Helper.testButtonIsDisabled(sut, "submit", false);
  });

  test("Should show spinner on submit", async () => {
    const { sut } = makeSut();
    await simulateValidSubmit(sut);
    testElementExists(sut, "spinner");
  });
});
