import { faker } from "@faker-js/faker";
import { render, RenderResult } from "@testing-library/react";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

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

const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number,
): void => {
  const element = sut.getByTestId(fieldName);
  expect(element.childElementCount).toBe(count);
};
const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean,
): void => {
  const element = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(element.disabled).toBe(isDisabled);
};
const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
): void => {
  const element = sut.getByTestId(`${fieldName}-status`);
  expect(element.title).toBe(validationError || "Tudo certo!");
  expect(element.textContent).toBe(validationError ? "🔴" : "🟢");
};

describe("Signup Component", () => {
  test("Should start with initial state", () => {
    const validationError = "Campo obrigatório";
    const { sut } = makeSut();
    testChildCount(sut, "error-wrap", 0);
    testButtonIsDisabled(sut, "submit", true);
    testStatusForField(sut, "name", validationError);
    testStatusForField(sut, "email", validationError);
    testStatusForField(sut, "password", validationError);
    testStatusForField(sut, "passwordConfirmation", validationError);
  });
});
