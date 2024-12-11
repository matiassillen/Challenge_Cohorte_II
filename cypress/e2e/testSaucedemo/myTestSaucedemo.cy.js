describe("testSaucedemo", { testIsolation: false }, () => {
  it("Buy with user 1", () => {
    cy.visit("https://www.saucedemo.com/");

    // Login with the user "standard_user"

    cy.get('input[placeholder="Username"]').type("standard_user");
    cy.get('input[placeholder="Password"]').type("secret_sauce");
    cy.get("#login-button").click();

    // Add products to cart

    // Verifica y hace clic en los elementos si existen
    cy.get("body").then(($body) => {
      if ($body.find(".btn.btn_primary.btn_small.btn_inventory").length) {
        cy.get(".btn.btn_primary.btn_small.btn_inventory").each(($btn) => {
          cy.wrap($btn).click();
        });
      } else {
        cy.log("No se encontraron elementos con la clase especificada.");
      }
    });
    cy.get('[data-test="shopping-cart-link"]').click();

    //Checkout

    cy.scrollTo("bottom");
    cy.get('[data-test="checkout"]').click();
    cy.scrollTo("top");
    cy.get('[data-test="firstName"]').type("Juan");
    cy.get('[data-test="lastName"]').type("López");
    cy.get('[data-test="postalCode"]').type("3200");
    cy.get('[data-test="continue"]').click();

    // Validate that the Checkout has been completed

    cy.scrollTo("bottom");
    cy.get('[data-test="finish"]').click();
    cy.scrollTo("top");
  });
});
