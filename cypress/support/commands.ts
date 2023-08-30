declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(id: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add("getByTestId", (id) => {
  return cy.get(`[data-testid=${id}]`);
});

export {};
