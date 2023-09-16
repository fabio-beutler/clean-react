import { fireEvent, render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import { AccountModel } from "@/domain/models";
import { MockApiContextProvider } from "@/presentation/test";

import Header from "./Header";

type SutTypes = {
  setCurrentAccountMock: (account: AccountModel | undefined) => void;
};

const makeSut = (): SutTypes => {
  const setCurrentAccountMock = vi.fn();
  render(
    <MockApiContextProvider setCurrentAccount={setCurrentAccountMock}>
      <Header />
    </MockApiContextProvider>,
    {
      wrapper: MemoryRouterProvider,
    },
  );
  return { setCurrentAccountMock };
};

describe("Header Component", () => {
  test("Should call setCurrentAccount with null value on logout", () => {
    const { setCurrentAccountMock } = makeSut();
    fireEvent.click(screen.getByTestId("logout"));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(mockRouter.asPath).toBe("/login");
  });
});
