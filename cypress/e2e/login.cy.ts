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
    cy.getByTestId("email").type(faker.word.sample());
    cy.getByTestId("email-status")
      .should("have.attr", "title", "Campo inválido")
      .and("contain.text", "🔴");
    cy.getByTestId("password").type(faker.word.sample({ length: 3 }));
    cy.getByTestId("password-status")
      .should("have.attr", "title", "Campo inválido")
      .and("contain.text", "🔴");
    cy.getByTestId("submit").should("be.disabled");
    cy.getByTestId("error-wrap").should("be.empty");
  });

  it("Should present valid state if form is valid", () => {
    cy.getByTestId("email").type(faker.internet.email());
    cy.getByTestId("email-status")
      .should("have.attr", "title", "Tudo certo!")
      .and("contain.text", "🟢");
    cy.getByTestId("password").type(faker.internet.password({ length: 5 }));
    cy.getByTestId("password-status")
      .should("have.attr", "title", "Tudo certo!")
      .and("contain.text", "🟢");
    cy.getByTestId("submit").should("be.enabled");
    cy.getByTestId("error-wrap").should("be.empty");
  });

  it("Should present error if invalid credentials are provided", () => {
    cy.getByTestId("email").type(faker.internet.email());
    cy.getByTestId("password").type(faker.internet.password({ length: 5 }));
    cy.intercept("POST", "**/login", {
      statusCode: 401,
      body: {
        error: faker.word.sample(),
      },
      delay: 500,
    }).as("InvalidCredentials");
    cy.getByTestId("submit").click();
    cy.getByTestId("error-wrap")
      .getByTestId("spinner")
      .should("exist")
      .getByTestId("main-error")
      .should("not.exist")
      .getByTestId("spinner")
      .should("not.exist")
      .getByTestId("main-error")
      .should("contain.text", "Credenciais inválidas");
    cy.url().should("equal", `${baseUrl}/login`);
  });

  it("Should present error if network fails", () => {
    cy.getByTestId("email").type(faker.internet.email());
    cy.getByTestId("password").type(faker.internet.password({ length: 5 }));
    cy.intercept("POST", "**/login", {
      statusCode: 500,
      body: null,
      delay: 500,
    }).as("NetworkError");
    cy.getByTestId("submit").click();
    cy.getByTestId("error-wrap")
      .getByTestId("spinner")
      .should("exist")
      .getByTestId("main-error")
      .should("not.exist")
      .getByTestId("spinner")
      .should("not.exist")
      .getByTestId("main-error")
      .should(
        "contain.text",
        "Algo de errado aconteceu. Tente novamente em breve.",
      );
    cy.url().should("equal", `${baseUrl}/login`);
  });

  it("Should present save accessToken if valid credentials are provided", () => {
    cy.getByTestId("email").focus().type(faker.internet.email());
    cy.getByTestId("password")
      .focus()
      .type(faker.internet.password({ length: 5 }));
    cy.intercept("POST", "**/login", {
      statusCode: 200,
      body: {
        accessToken: faker.string.uuid(),
      },
      delay: 500,
    }).as("ValidCredentials");
    cy.getByTestId("submit").click();
    cy.getByTestId("error-wrap")
      .getByTestId("spinner")
      .should("exist")
      .getByTestId("main-error")
      .should("not.exist")
      .getByTestId("spinner")
      .should("not.exist");
    cy.url().should("equal", `${baseUrl}/`);
    cy.window().then((window) => {
      assert.isOk(window.localStorage.getItem("@4Devs:accessToken"));
    });
  });
});
