import { faker } from "@faker-js/faker";

describe("Login", () => {
  beforeEach(() => {
    cy.visit("login");
  });

  it("Should load with correct initial state", () => {
    cy.getByTestId("email").should("not.have.focus").and("be.empty");
    cy.getByTestId("password").should("not.have.focus").and("be.empty");
    cy.getByTestId("email-status")
      .should("have.attr", "title", "Campo obrigatório")
      .and("contain.text", "🔴");
    cy.getByTestId("password-status")
      .should("have.attr", "title", "Campo obrigatório")
      .and("contain.text", "🔴");
    cy.getByTestId("submit").should("be.disabled");
    cy.getByTestId("error-wrap").should("be.empty");
  });

  it("Should present error state if form is invalid", () => {
    cy.getByTestId("email").focus().type(faker.word.sample());
    cy.getByTestId("email-status")
      .should("have.attr", "title", "Campo inválido")
      .and("contain.text", "🔴");
    cy.getByTestId("password")
      .focus()
      .type(faker.word.sample({ length: 3 }));
    cy.getByTestId("password-status")
      .should("have.attr", "title", "Campo inválido")
      .and("contain.text", "🔴");
    cy.getByTestId("submit").should("be.disabled");
    cy.getByTestId("error-wrap").should("be.empty");
  });
});
