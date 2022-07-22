context("Test the overall app", () => {
  beforeEach(() => {
    cy.visit("/cart-index.html");
  });

  describe("it shows the startup screens", () => {
    it("renders with an instruction page", () => {
      cy.get("[data-cy=instructions]")
        .should("be.visible");
    });
  });
});
