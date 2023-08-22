import { faker } from "@faker-js/faker";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
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

describe("Signup Component", () => {
  afterEach(cleanup);

  test("Should start with initial state", () => {
    const validationError = faker.word.sample();
    const { sut } = makeSut({ validationError });
    Helper.testChildCount(sut, "error-wrap", 0);
    Helper.testButtonIsDisabled(sut, "submit", true);
    Helper.testStatusForField(sut, "name", validationError);
    Helper.testStatusForField(sut, "email", "Campo obrigatório");
    Helper.testStatusForField(sut, "password", "Campo obrigatório");
    Helper.testStatusForField(sut, "passwordConfirmation", "Campo obrigatório");
  });

  test("Should show name error if Validation fails", () => {
    const validationError = faker.word.sample();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, "name");
    Helper.testStatusForField(sut, "name", validationError);
  });
});
