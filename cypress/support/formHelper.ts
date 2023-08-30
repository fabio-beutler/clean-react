export const testInputStatus = (
  field: string,
  errorMessage: string,
  status: string,
) => {
  cy.getByTestId(`${field}-status`)
    .should("have.attr", "title", errorMessage)
    .and("contain.text", status);
  return cy.getByTestId(field);
};

export const testMainError = (errorMessage: string) => {
  cy.getByTestId("spinner").should("not.exist");
  cy.getByTestId("main-error").should("contain.text", errorMessage);
};

export const testIsLoading = () => {
  cy.getByTestId("spinner").should("exist");
  cy.getByTestId("main-error").should("not.exist");
};
