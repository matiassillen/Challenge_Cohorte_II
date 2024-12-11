describe("testSaucedemo", { testIsolation: false }, () => {
  it("Buy with user 1", () => {
    cy.visit("https://www.saucedemo.com/");

    //Login with the user "standard_user"

    cy.get('input[placeholder="Username"]').type("standard_user");
    cy.get('input[placeholder="Password"]').type("secret_sauce");
    cy.get("#login-button").click();
  });
});
