import { faker } from "@faker-js/faker";

import * as FormHelper from "../support/formHelper";

const baseUrl = Cypress.config().baseUrl;

describe("Signup", () => {
  beforeEach(() => {
    cy.visit("signup");
  });

  it("Should load with correct initial state", () => {
    FormHelper.testInputStatus("name", "Campo obrigatório", "🔴")
      .should("not.have.focus")
      .and("be.empty");
    FormHelper.testInputStatus("email", "Campo obrigatório", "🔴")
      .should("not.have.focus")
      .and("be.empty");
    FormHelper.testInputStatus("password", "Campo obrigatório", "🔴")
      .should("not.have.focus")
      .and("be.empty");
    FormHelper.testInputStatus(
      "passwordConfirmation",
      "Campo obrigatório",
      "🔴",
    )
      .should("not.have.focus")
      .and("be.empty");
    cy.getByTestId("submit").should("be.disabled");
    cy.getByTestId("error-wrap").should("be.empty");
  });

  it("Should present error state if form is invalid", () => {
    cy.getByTestId("name")
      .focus()
      .type(faker.word.sample({ length: 2 }));
    FormHelper.testInputStatus("name", "Campo inválido", "🔴");
    cy.getByTestId("email").focus().type(faker.word.sample());
    FormHelper.testInputStatus("email", "Campo inválido", "🔴");
    cy.getByTestId("password")
      .focus()
      .type(faker.word.sample({ length: 3 }));
    FormHelper.testInputStatus("password", "Campo inválido", "🔴");
    cy.getByTestId("passwordConfirmation")
      .focus()
      .type(faker.word.sample({ length: 2 }));
    FormHelper.testInputStatus("passwordConfirmation", "Campo inválido", "🔴");
    cy.getByTestId("submit").should("be.disabled");
    cy.getByTestId("error-wrap").should("be.empty");
  });
});
