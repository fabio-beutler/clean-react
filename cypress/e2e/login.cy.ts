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
      delay: 50,
    }).as("InvalidCredentials");
    cy.getByTestId("submit").click();
    cy.getByTestId("spinner").should("exist");
    cy.getByTestId("main-error").should("not.exist");
    cy.getByTestId("spinner").should("not.exist");
    cy.getByTestId("main-error").should(
      "contain.text",
      "Credenciais inválidas",
    );
    cy.url().should("equal", `${baseUrl}/login`);
  });

  it("Should present error if network fails", () => {
    cy.getByTestId("email").type(faker.internet.email());
    cy.getByTestId("password").type(faker.internet.password({ length: 5 }));
    cy.intercept("POST", "**/login", {
      statusCode: 500,
      body: null,
      delay: 50,
    }).as("NetworkError");
    cy.getByTestId("submit").click();
    cy.getByTestId("spinner").should("exist");
    cy.getByTestId("main-error").should("not.exist");
    cy.getByTestId("spinner").should("not.exist");
    cy.getByTestId("main-error").should(
      "contain.text",
      "Algo de errado aconteceu. Tente novamente em breve.",
    );
    cy.url().should("equal", `${baseUrl}/login`);
  });

  it("Should present save accessToken if valid credentials are provided", () => {
    cy.getByTestId("email").type(faker.internet.email());
    cy.getByTestId("password").type(faker.internet.password({ length: 5 }));
    cy.intercept("POST", "**/login", {
      statusCode: 200,
      body: {
        accessToken: faker.string.uuid(),
      },
      delay: 50,
    }).as("ValidCredentials");
    cy.getByTestId("submit").click();
    cy.getByTestId("spinner").should("exist");
    cy.getByTestId("main-error").should("not.exist");
    cy.getByTestId("spinner").should("not.exist");
    cy.url().should("equal", `${baseUrl}/`);
    cy.window().then((window) => {
      assert.isOk(window.localStorage.getItem("@4Devs:accessToken"));
    });
  });

  it("Should submit form when press enter", () => {
    cy.intercept("POST", "**/login", {
      statusCode: 200,
      body: {
        accessToken: faker.string.uuid(),
      },
      delay: 50,
    }).as("ValidCredentials");
    cy.getByTestId("email").type(faker.internet.email());
    cy.getByTestId("password")
      .type(faker.internet.password({ length: 5 }))
      .type("{enter}");
    cy.getByTestId("spinner").should("exist");
    cy.getByTestId("main-error").should("not.exist");
    cy.getByTestId("spinner").should("not.exist");
    cy.url().should("equal", `${baseUrl}/`);
    cy.window().then((window) => {
      assert.isOk(window.localStorage.getItem("@4Devs:accessToken"));
    });
  });

  it("Should prevent multiple submits", () => {
    cy.getByTestId("email").type(faker.internet.email());
    cy.getByTestId("password").type(faker.internet.password({ length: 5 }));
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
