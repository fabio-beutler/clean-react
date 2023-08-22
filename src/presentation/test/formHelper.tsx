import { faker } from "@faker-js/faker";
import { fireEvent, RenderResult } from "@testing-library/react";

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

export const populateField = (
  sut: RenderResult,
  fieldName: string,
  value = faker.word.sample(),
): void => {
  const inputElement = sut.getByTestId(fieldName) as HTMLInputElement;
  fireEvent.input(inputElement, {
    target: { value },
  });
};

export const testElementExists = (
  sut: RenderResult,
  fieldName: string,
): void => {
  const element = sut.getByTestId(fieldName);
  expect(element).toBeTruthy();
};

export const testElementText = (
  sut: RenderResult,
  fieldName: string,
  text: string,
): void => {
  const element = sut.getByTestId(fieldName);
  expect(element.textContent).toBe(text);
};
