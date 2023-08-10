import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import Login from "./Login";

describe("Login Component", () => {
  test("Should not render spinner and error on start", () => {
    const { getByTestId } = render(<Login />);
    const errorWrap = getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);
  });
});
