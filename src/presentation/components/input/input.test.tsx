import { faker } from "@faker-js/faker";
import { render, RenderResult } from "@testing-library/react";

import { useLoginFormContext } from "@/presentation/contexts";

import Input from "./Input";

type SutTypes = {
  sut: RenderResult;
  inputFieldName: string;
};

const makeSut = (): SutTypes => {
  const inputFieldName = faker.word.sample();
  const sut = render(
    <Input
      name={inputFieldName}
      tooltip={"email"}
      formContext={useLoginFormContext}
    />,
  );
  return { sut, inputFieldName };
};

describe("Input Component", () => {
  test("Should begin render correctly", () => {
    const { sut, inputFieldName } = makeSut();
    const input = sut.getByTestId(inputFieldName) as HTMLInputElement;
    expect(input).toBeTruthy();
  });
});
