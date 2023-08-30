import { faker } from "@faker-js/faker";

export const mockInvalidCredentialsError = (url: RegExp) => {
  cy.intercept("POST", url, {
    statusCode: 401,
    body: {
      error: faker.word.sample(),
    },
    delay: 50,
  }).as("InvalidCredentials");
};

export const mockEmailInUseError = (url: RegExp) => {
  cy.intercept("POST", url, {
    statusCode: 403,
    body: {
      error: faker.word.sample(),
    },
    delay: 50,
  }).as("EmailInUse");
};

export const mockUnexpectedError = (url: RegExp) => {
  cy.intercept("POST", url, {
    statusCode: 500,
    body: null,
    delay: 50,
  }).as("NetworkError");
};

export const mockOk = (url: RegExp, response: any) => {
  cy.intercept("POST", url, {
    statusCode: 200,
    body: response,
    delay: 50,
  }).as("ValidCredentials");
};
