context("Test the overall app", () => {
  beforeEach(() => {
    cy.visit("/cart-index.html");
  });

  describe("Desktop functionalities", () => {
    it("renders with a simulation stage", () => {
      cy.get("[data-cy=stage]")
        .should("be.visible");
    });
    it("renders with a force-selector", () => {
      cy.get("[data-cy=force-selector]")
        .should("be.visible");
    });
  });
});
