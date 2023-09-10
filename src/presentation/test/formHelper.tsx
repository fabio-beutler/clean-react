import { faker } from "@faker-js/faker";
import { fireEvent, screen } from "@testing-library/react";

export const testStatusForField = (
  fieldName: string,
  validationError?: string,
): void => {
  const element = screen.getByTestId(`${fieldName}-status`);
  expect(element).toHaveAttribute("title", validationError || "Tudo certo!");
  expect(element).toHaveTextContent(validationError ? "🔴" : "🟢");
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
