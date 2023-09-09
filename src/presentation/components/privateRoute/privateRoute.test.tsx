import { faker } from "@faker-js/faker";
import { render } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import { mockAccountModel } from "@/domain/test";
import { MockApiContextProvider } from "@/presentation/test";

import PrivateRoute from "./PrivateRoute";

const makeSut = (getCurrentAccountMock = vi.fn()) => {
  getCurrentAccountMock.mockReturnValueOnce(mockAccountModel());
  render(
    <MockApiContextProvider getCurrentAccount={getCurrentAccountMock}>
      <PrivateRoute>{faker.word.sample()}</PrivateRoute>
    </MockApiContextProvider>,
    { wrapper: MemoryRouterProvider },
  );
};

describe("PrivateRoute", () => {
  test("Should redirect to /login if token is empty", () => {
    mockRouter.push("/"); // initial route
    const getCurrentAccountMock = vi.fn().mockReturnValueOnce(undefined);
    makeSut(getCurrentAccountMock);
    expect(mockRouter.asPath).toBe("/login");
  });

  test("Should render current component if token is not empty", () => {
    mockRouter.push("/"); // initial route
    makeSut();
    expect(mockRouter.asPath).toBe("/");
  });
});
