import { render, RenderResult } from "@testing-library/react";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import { Helper } from "@/presentation/test";

import Signup from "./Signup";

type SutTypes = {
  sut: RenderResult;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const sut = render(<Signup />, { wrapper: MemoryRouterProvider });
  return { sut };
};

describe("Signup Component", () => {
  test("Should start with initial state", () => {
    const validationError = "Campo obrigatório";
    const { sut } = makeSut();
    Helper.testChildCount(sut, "error-wrap", 0);
    Helper.testButtonIsDisabled(sut, "submit", true);
    Helper.testStatusForField(sut, "name", validationError);
    Helper.testStatusForField(sut, "email", validationError);
    Helper.testStatusForField(sut, "password", validationError);
    Helper.testStatusForField(sut, "passwordConfirmation", validationError);
  });
});
