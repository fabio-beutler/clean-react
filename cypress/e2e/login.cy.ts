import { faker } from "@faker-js/faker";

const baseUrl = Cypress.config().baseUrl;

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

  it("Should present valid state if form is valid", () => {
    cy.getByTestId("email").focus().type(faker.internet.email());
    cy.getByTestId("email-status")
      .should("have.attr", "title", "Tudo certo!")
      .and("contain.text", "🟢");
    cy.getByTestId("password")
      .focus()
      .type(faker.internet.password({ length: 5 }));
    cy.getByTestId("password-status")
      .should("have.attr", "title", "Tudo certo!")
      .and("contain.text", "🟢");
    cy.getByTestId("submit").should("be.enabled");
    cy.getByTestId("error-wrap").should("be.empty");
  });

  it("Should present error if invalid credentials are provided", () => {
    cy.getByTestId("email").focus().type(faker.internet.email());
    cy.getByTestId("password")
      .focus()
      .type(faker.internet.password({ length: 5 }));
    cy.getByTestId("submit")
      .click()
      .then(() => {
        cy.getByTestId("error-wrap")
          .getByTestId("spinner")
          .should("exist")
          .getByTestId("main-error")
          .should("not.exist")
          .getByTestId("spinner")
          .should("not.exist")
          .getByTestId("main-error")
          .should("contain.text", "Credenciais inválidas");
      });
    cy.url().should("equal", `${baseUrl}/login`);
  });
});
