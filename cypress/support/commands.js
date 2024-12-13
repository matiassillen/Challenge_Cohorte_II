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

// Command to add products to the cart
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

// Command to validate that the checkout has been completed
Cypress.Commands.add("validateCheckout", () => {
  cy.get('[data-test="finish"]').should("be.visible").and("not.be.disabled");
  cy.get('[data-test="finish"]').click();

  cy.get('[data-test="title"]')
    .should("be.visible")
    .and("contain", "Checkout: Complete!");

  cy.get('[data-test="pony-express"]').should("be.visible");
  cy.get('[data-test="complete-header"]')
    .should("be.visible")
    .and("contain", "Thank you for your order!");
  cy.get('[data-test="complete-text"]')
    .should("be.visible")
    .and(
      "contain",
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    );
  cy.get('[data-test="back-to-products"]')
    .should("be.visible")
    .and("not.be.disabled");
});

// Command to Checkout
Cypress.Commands.add("checkout", (username, lastname, postalcode) => {
  cy.get('[data-test="checkout"]').click();
  cy.scrollTo("top");
  cy.get('[data-test="firstName"]').type(username);
  cy.get('[data-test="lastName"]').type(lastname);
  cy.get('[data-test="postalCode"]').type(postalcode);
  cy.get('[data-test="continue"]').click();
});
