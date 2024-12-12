describe("testSaucedemo", { testIsolation: false }, () => {
  it("Buy with user 1", () => {
    cy.visit("https://www.saucedemo.com/");

    // Login with the user "standard_user"

    cy.get('input[placeholder="Username"]').type("standard_user");
    cy.get('input[placeholder="Password"]').type("secret_sauce");
    cy.get("#login-button").click();

    // Add products to cart

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

    //Perform the logout

    cy.get('[data-test="back-to-products"]').click();
    cy.get(".bm-burger-button").click();
    cy.get('[data-test="logout-sidebar-link"]').click();
  });

  it.only("Buy with user 2", () => {
    cy.visit("https://www.saucedemo.com/");

    // Login with the user "problem_user"

    cy.get('input[placeholder="Username"]').type("problem_user");
    cy.get('input[placeholder="Password"]').type("secret_sauce");
    cy.get("#login-button").click();

    // Add products to cart

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

    //Checkout

    cy.scrollTo("bottom");
    cy.get('[data-test="checkout"]').click();
    cy.scrollTo("top");
    cy.get('[data-test="firstName"]').type("Ana");
    cy.get('[data-test="lastName"]').type("Sanchez");
    cy.get('[data-test="postalCode"]').type("3200");
    cy.get('[data-test="lastName"]').should("have.value", "Sanchez");
    cy.get('[data-test="continue"]').click();
  });
});
