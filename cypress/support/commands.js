// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Command to log in with any user
Cypress.Commands.add("login", (username, password) => {
  cy.get('input[placeholder="Username"]').type(username);
  cy.get('input[placeholder="Password"]').type(password);
  cy.get("#login-button").click();
});

//Command to add products to the cart
Cypress.Commands.add("addProductsToCart", () => {
  // Check and click on the items if they exist
  cy.get("body").then(($body) => {
    if ($body.find(".btn.btn_primary.btn_small.btn_inventory").length) {
      cy.get(".btn.btn_primary.btn_small.btn_inventory").each(($btn) => {
        cy.wrap($btn).click();
      });
    } else {
      cy.log("No items were found with the specified class.");
    }
  });
  cy.get('[data-test="shopping-cart-link"]').click();
});
