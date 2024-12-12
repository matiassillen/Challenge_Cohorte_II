describe("testSaucedemo", { testIsolation: false }, () => {
  it("Buy with user 1", () => {
    cy.visit("https://www.saucedemo.com/");

    // Login with the user "standard_user"
    cy.login("standard_user", "secret_sauce");

    // Add products to cart
    cy.addProductsToCart();

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

  it("Buy with user 2", () => {
    // Login with the user "problem_user"

    cy.login("problem_user", "secret_sauce");

    // Add products to cart
    cy.addProductsToCart();

    //Checkout

    cy.scrollTo("bottom");
    cy.get('[data-test="checkout"]').click();
    cy.scrollTo("top");
    cy.get('[data-test="firstName"]').type("Ana");
    cy.get('[data-test="lastName"]').type("Sanchez");
    cy.get('[data-test="postalCode"]').type("3200");
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="lastName"]').should("have.value", "Sanchez");
  });
});
