import { render } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import PrivateRoute from "./PrivateRoute";

const makeSut = () => {
  render(<PrivateRoute />, { wrapper: MemoryRouterProvider });
};

describe("PrivateRoute", () => {
  test("Should redirect to /login if token is empty", () => {
    mockRouter.push("/"); // initial route
    makeSut();
    expect(mockRouter.asPath).toBe("/login");
  });
});
