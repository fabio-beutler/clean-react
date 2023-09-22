import { fireEvent, render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import { AccountModel } from "@/domain/models";
import { mockAccountModel } from "@/domain/test";
import { MockApiContextProvider } from "@/presentation/test";

import UserInfo from "./UserInfo";

type SutTypes = {
  setCurrentAccountMock: (account: AccountModel | undefined) => void;
};

const makeSut = (account = mockAccountModel()): SutTypes => {
  const setCurrentAccountMock = vi.fn();
  const getCurrentAccountStub = () => account;
  render(
    <MockApiContextProvider
      setCurrentAccount={setCurrentAccountMock}
      getCurrentAccount={getCurrentAccountStub}
    >
      <UserInfo />
    </MockApiContextProvider>,
    {
      wrapper: MemoryRouterProvider,
    },
  );
  return { setCurrentAccountMock };
};

describe("UserInfo Component", () => {
  test("Should call setCurrentAccount with null value on logout", () => {
    const { setCurrentAccountMock } = makeSut();
    fireEvent.click(screen.getByTestId("logout"));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(mockRouter.asPath).toBe("/login");
  });

  test("Should render username correctly", () => {
    const account = mockAccountModel();
    makeSut(account);
    expect(screen.getByTestId("username")).toHaveTextContent(account.name);
  });
});
