import { faker } from "@faker-js/faker";

import * as FormHelper from "../support/formHelper";
import * as Http from "../support/signupMocks";

const baseUrl = Cypress.config().baseUrl;

const populateFields = () => {
  cy.getByTestId("name").focus().type(faker.internet.userName());
  cy.getByTestId("email").focus().type(faker.internet.email());
  const password = faker.internet.password({ length: 5 });
  cy.getByTestId("password").focus().type(password);
  cy.getByTestId("passwordConfirmation").focus().type(password);
};
const simulateValidSubmit = () => {
  populateFields();
  cy.getByTestId("submit").click();
};
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

  it("Should present valid state if form is valid", () => {
    cy.getByTestId("name").focus().type(faker.internet.userName());
    FormHelper.testInputStatus("name", "Tudo certo!", "🟢");
    cy.getByTestId("email").focus().type(faker.internet.email());
    FormHelper.testInputStatus("email", "Tudo certo!", "🟢");
    const password = faker.internet.password({ length: 5 });
    cy.getByTestId("password").focus().type(password);
    FormHelper.testInputStatus("password", "Tudo certo!", "🟢");
    cy.getByTestId("passwordConfirmation").focus().type(password);
    FormHelper.testInputStatus("passwordConfirmation", "Tudo certo!", "🟢");
    cy.getByTestId("submit").should("be.enabled");
    cy.getByTestId("error-wrap").should("be.empty");
  });

  it("Should present EmailInUseError on 403", () => {
    Http.mockEmailInUseError();
    simulateValidSubmit();
    cy.getByTestId("spinner").should("exist");
    cy.getByTestId("main-error").should("not.exist");
    FormHelper.testMainError("Esse e-mail já está em uso");
    cy.url().should("equal", `${baseUrl}/signup`);
  });

  it("Should present error if network fails", () => {
    Http.mockUnexpectedError();
    simulateValidSubmit();
    FormHelper.testIsLoading();
    FormHelper.testMainError(
      "Algo de errado aconteceu. Tente novamente em breve.",
    );
    cy.url().should("equal", `${baseUrl}/signup`);
  });

  it("Should present UnexpectedError if invalid data is returned", () => {
    Http.mockInvalidData();
    simulateValidSubmit();
    FormHelper.testIsLoading();
    FormHelper.testMainError(
      "Algo de errado aconteceu. Tente novamente em breve.",
    );
    cy.url().should("equal", `${baseUrl}/signup`);
  });

  it("Should present save accessToken if valid credentials are provided", () => {
    Http.mockOk();
    simulateValidSubmit();
    FormHelper.testIsLoading();
    cy.getByTestId("spinner").should("not.exist");
    cy.url().should("equal", `${baseUrl}/`);
    cy.window().then((window) => {
      assert.isOk(window.localStorage.getItem("@4Devs:accessToken"));
    });
  });

  it("Should prevent multiple submits", () => {
    let requestsCount = 0;
    cy.intercept("POST", "**/signup", (req) => {
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

  it("Should submit form when press enter", () => {
    Http.mockOk();
    populateFields();
    cy.getByTestId("passwordConfirmation").type("{enter}");
    FormHelper.testIsLoading();
    cy.getByTestId("spinner").should("not.exist");
    cy.url().should("equal", `${baseUrl}/`);
    cy.window().then((window) => {
      assert.isOk(window.localStorage.getItem("@4Devs:accessToken"));
    });
  });

  it("Should not call submit if form is invalid", () => {
    let requestsCount = 0;
    cy.intercept("POST", "**/signup", (req) => {
      requestsCount += 1;
      req.reply({
        statusCode: 200,
        body: {
          accessToken: faker.string.uuid(),
        },
        delay: 50,
      });
    }).as("request");
    cy.getByTestId("email")
      .focus()
      .type(faker.internet.email())
      .type("{enter}");
    expect(requestsCount).to.eq(0);
  });
});
