import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import Login from "./Login";

describe("Login Component", () => {
  test("Should start with initial state", () => {
    const { getByTestId } = render(<Login />);
    const errorWrap = getByTestId("error-wrap") as HTMLDivElement;
    expect(errorWrap.childElementCount).toBe(0);
    const submitButton = getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
    const emailStatus = getByTestId("email-status") as HTMLSpanElement;
    expect(emailStatus.title).toBe("Campo obrigatório");
    expect(emailStatus.textContent).toBe("🔴");
    const passwordStatus = getByTestId("password-status") as HTMLSpanElement;
    expect(passwordStatus.title).toBe("Campo obrigatório");
    expect(passwordStatus.textContent).toBe("🔴");
  });
});
