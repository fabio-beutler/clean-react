import { RenderResult } from "@testing-library/react";

export const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number,
): void => {
  const element = sut.getByTestId(fieldName);
  expect(element.childElementCount).toBe(count);
};
export const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean,
): void => {
  const buttonElement = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(buttonElement.disabled).toBe(isDisabled);
};
export const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
): void => {
  const element = sut.getByTestId(`${fieldName}-status`);
  expect(element.title).toBe(validationError || "Tudo certo!");
  expect(element.textContent).toBe(validationError ? "🔴" : "🟢");
};
