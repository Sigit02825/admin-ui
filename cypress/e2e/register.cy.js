describe("Register page", () => {
  beforeEach(() => {
    cy.viewport(550, 750);
    cy.visit("http://localhost:5173/register");
    cy.url().should("include", "/register");
  });

  it("should display the registration form with expected content", () => {
    cy.contains("Create an Account").should("be.visible");

    cy.get("label").contains("Full Name").should("be.visible");
    cy.get("input#fullname")
      .should("be.visible")
      .should("have.attr", "placeholder", "John Doe");

    cy.get("label").contains("Email address").should("be.visible");
    cy.get("input#email")
      .should("be.visible")
      .should("have.attr", "placeholder", "hello@example.com");

    cy.get("label").contains("Password").should("be.visible");
    cy.get("input#password")
      .should("be.visible")
      .should("have.attr", "placeholder", "••••••••");

    cy.get("label").contains("Confirm Password").should("be.visible");
    cy.get("input#confirmPassword")
      .should("be.visible")
      .should("have.attr", "placeholder", "••••••••");

    cy.get("input#terms").should("exist");
    cy.contains("Terms and Conditions").should("be.visible");
    cy.get("button").contains("Create Account").should("be.visible");
    cy.contains("Already have an account?").should("be.visible");
  });

  it("should accept valid registration input values", () => {
    cy.get("input#fullname")
      .type("John Doe")
      .should("have.value", "John Doe");

    cy.get("input#email")
      .type("test@example.com")
      .should("have.value", "test@example.com");

    cy.get("input#password")
      .type("Password123!")
      .should("have.value", "Password123!");

    cy.get("input#confirmPassword")
      .type("Password123!")
      .should("have.value", "Password123!");

    cy.get("input#terms").check().should("be.checked");
    cy.get("button").contains("Create Account").should("be.enabled");
  });

  it("should show a mismatch message when password and confirm password differ", () => {
    cy.get("input#fullname").type("John Doe");
    cy.get("input#email").type("test@example.com");
    cy.get("input#password").type("Password123!");
    cy.get("input#confirmPassword").type("PasswordTest!");
    cy.get("input#terms").check();
    cy.get("button").contains("Create Account").click();
    cy.contains("Password tidak cocok").should("be.visible");
  });
});
