import { faker } from "@faker-js/faker";
import { render } from "@testing-library/react";

import Input from "./Input";

describe("Input Component", () => {
  test("Should begin render correctly", () => {
    const inputFieldName = faker.word.sample();
    const { getByTestId } = render(
      <Input name={inputFieldName} tooltip={"email"} />,
    );
    const input = getByTestId(inputFieldName) as HTMLInputElement;
    expect(input).toBeTruthy();
  });
});
