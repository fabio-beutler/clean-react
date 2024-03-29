import { faker } from "@faker-js/faker";

import * as FormHelper from "../support/formHelper";
import * as Http from "../support/loginMocks";

const baseUrl = Cypress.config().baseUrl;

const populateFields = () => {
  cy.getByTestId("email").focus().type(faker.internet.email());
  cy.getByTestId("password")
    .focus()
    .type(faker.internet.password({ length: 5 }));
};
const simulateValidSubmit = () => {
  populateFields();
  cy.getByTestId("submit").click();
};

describe("Login", () => {
  beforeEach(() => {
    cy.visit("login");
  });

  it("Should load with correct initial state", () => {
    FormHelper.testInputStatus("email", "Campo obrigatório", "🔴")
      .should("not.have.focus")
      .and("be.empty");
    FormHelper.testInputStatus("password", "Campo obrigatório", "🔴")
      .should("not.have.focus")
      .and("be.empty");
    cy.getByTestId("submit").should("be.disabled");
    cy.getByTestId("error-wrap").should("be.empty");
  });

  it("Should present error state if form is invalid", () => {
    cy.getByTestId("email").type(faker.word.sample());
    FormHelper.testInputStatus("email", "Campo inválido", "🔴");
    cy.getByTestId("password").type(faker.word.sample({ length: 3 }));
    FormHelper.testInputStatus("password", "Campo inválido", "🔴");
    cy.getByTestId("submit").should("be.disabled");
    cy.getByTestId("error-wrap").should("be.empty");
  });

  it("Should present valid state if form is valid", () => {
    cy.getByTestId("email").type(faker.internet.email());
    FormHelper.testInputStatus("email", "Tudo certo!", "🟢");
    cy.getByTestId("password").type(faker.internet.password({ length: 5 }));
    FormHelper.testInputStatus("password", "Tudo certo!", "🟢");
    cy.getByTestId("submit").should("be.enabled");
    cy.getByTestId("error-wrap").should("be.empty");
  });

  it("Should present error if invalid credentials are provided", () => {
    Http.mockInvalidCredentialsError();
    simulateValidSubmit();
    FormHelper.testIsLoading();
    FormHelper.testMainError("Credenciais inválidas");
    cy.url().should("equal", `${baseUrl}/login`);
  });

  it("Should present error if network fails", () => {
    cy.getByTestId("email").type(faker.internet.email());
    cy.getByTestId("password").type(faker.internet.password({ length: 5 }));
    Http.mockUnexpectedError();
    cy.getByTestId("submit").click();
    cy.getByTestId("spinner").should("exist");
    cy.getByTestId("main-error").should("not.exist");
    FormHelper.testMainError(
      "Algo de errado aconteceu. Tente novamente em breve.",
    );
    cy.url().should("equal", `${baseUrl}/login`);
  });

  it("Should present UnexpectedError if invalid data is returned", () => {
    Http.mockInvalidData();
    simulateValidSubmit();
    FormHelper.testIsLoading();
    FormHelper.testMainError(
      "Algo de errado aconteceu. Tente novamente em breve.",
    );
    cy.url().should("equal", `${baseUrl}/login`);
  });

  it("Should present save account if valid credentials are provided", () => {
    Http.mockOk();
    simulateValidSubmit();
    FormHelper.testIsLoading();
    cy.getByTestId("spinner").should("not.exist");
    cy.url().should("equal", `${baseUrl}/`);
    cy.window().then((window) => {
      assert.isOk(window.localStorage.getItem("@4Devs:account"));
    });
  });

  it("Should submit form when press enter", () => {
    Http.mockOk();
    cy.getByTestId("email").type(faker.internet.email());
    cy.getByTestId("password")
      .type(faker.internet.password({ length: 5 }))
      .type("{enter}");
    cy.getByTestId("spinner").should("exist");
    cy.getByTestId("main-error").should("not.exist");
    cy.getByTestId("spinner").should("not.exist");
    cy.url().should("equal", `${baseUrl}/`);
    cy.window().then((window) => {
      assert.isOk(window.localStorage.getItem("@4Devs:account"));
    });
  });

  it("Should prevent multiple submits", () => {
    let requestsCount = 0;
    cy.intercept("POST", "**/login", (req) => {
      requestsCount += 1;
      req.reply({
        statusCode: 200,
        body: { accessToken: faker.string.uuid() },
        delay: 50,
      });
    }).as("request");
    populateFields();
    cy.getByTestId("submit").click();
    cy.getByTestId("submit").click();
    cy.wait("@request").then(() => {
      expect(requestsCount).to.eq(1);
    });
  });

  it("Should not call submit if form is invalid", () => {
    let requestsCount = 0;
    cy.intercept("POST", "**/login", (req) => {
      requestsCount += 1;
      req.reply({
        statusCode: 200,
        body: {
          accessToken: faker.string.uuid(),
        },
        delay: 50,
      });
    }).as("request");
    cy.getByTestId("email").type(faker.internet.email()).type("{enter}");
    expect(requestsCount).to.eq(0);
  });
});
