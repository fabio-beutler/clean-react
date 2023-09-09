import { faker } from "@faker-js/faker";
import { fireEvent, screen } from "@testing-library/react";

export const testChildCount = (fieldName: string, count: number): void => {
  const element = screen.getByTestId(fieldName);
  expect(element.childElementCount).toBe(count);
};
export const testButtonIsDisabled = (
  fieldName: string,
  isDisabled: boolean,
): void => {
  const buttonElement = screen.getByTestId(fieldName) as HTMLButtonElement;
  expect(buttonElement.disabled).toBe(isDisabled);
};
export const testStatusForField = (
  fieldName: string,
  validationError?: string,
): void => {
  const element = screen.getByTestId(`${fieldName}-status`);
  expect(element.title).toBe(validationError || "Tudo certo!");
  expect(element.textContent).toBe(validationError ? "🔴" : "🟢");
};

export const populateField = (
  fieldName: string,
  value = faker.word.sample(),
): void => {
  const inputElement = screen.getByTestId(fieldName) as HTMLInputElement;
  fireEvent.input(inputElement, {
    target: { value },
  });
};

export const testElementExists = (fieldName: string): void => {
  const element = screen.getByTestId(fieldName);
  expect(element).toBeTruthy();
};

export const testElementText = (fieldName: string, text: string): void => {
  const element = screen.getByTestId(fieldName);
  expect(element.textContent).toBe(text);
};
