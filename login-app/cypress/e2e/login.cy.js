describe("Login Form Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Başarılı form doldurulduğunda submit edebiliyorum", () => {
    cy.get("input[name='email']").type("test@example.com");
    cy.get("input[name='password']").type("Password123");
    cy.get("input[name='terms']").check();
    cy.get("button").should("not.be.disabled").click();
    cy.url().should("include", "/success");
  });

  it("Hatalı durumlarda beklenen hata mesajları görünüyor", () => {
    // Email yanlış
    cy.get("input[name='email']").type("test");
    cy.get("button").should("be.disabled");
    cy.contains("Geçerli bir email giriniz.").should("be.visible");

    // Email ve şifre yanlış
    cy.get("input[name='password']").type("pass");
    cy.contains("Şifre en az 8 karakter, bir büyük harf ve bir sayı içermelidir.").should("be.visible");

    // Şartları kabul etmeden
    cy.get("input[name='email']").clear().type("test@example.com");
    cy.get("input[name='password']").clear().type("Password123");
    cy.get("button").should("be.disabled");
  });
});
