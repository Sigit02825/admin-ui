import { Document, Packer, Paragraph, TextRun } from "docx";
import { writeFileSync } from "node:fs";

const doc = new Document({
  sections: [
    {
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun({ text: "Skenario Testing Halaman Register", bold: true, size: 28 }),
          ],
        }),
        new Paragraph({ text: "" }),
        new Paragraph({
          children: [
            new TextRun({ text: "Tujuan:", bold: true }),
            new TextRun({ text: " Memastikan halaman register menampilkan konten yang benar dan menerima input pengguna sesuai." }),
          ],
        }),
        new Paragraph({ text: "" }),
        new Paragraph({
          children: [
            new TextRun({ text: "Skenario:", bold: true }),
          ],
        }),
        new Paragraph({ text: "1. Buka halaman register dan periksa semua elemen form yang tampil." }),
        new Paragraph({ text: "2. Pastikan label 'Full Name', 'Email address', 'Password', 'Confirm Password', dan checkbox terms tersedia." }),
        new Paragraph({ text: "3. Masukkan nilai valid ke semua input form dan konfirmasi checkbox terms dapat dicek." }),
        new Paragraph({ text: "4. Pastikan tombol 'Create Account' terlihat dan aktif setelah input valid." }),
        new Paragraph({ text: "" }),
        new Paragraph({
          children: [
            new TextRun({ text: "Kode Cypress:", bold: true }),
          ],
        }),
        new Paragraph({ text: "" }),
        new Paragraph({
          children: [
            new TextRun({
              text: `describe(\"Register page\", () => {\n  beforeEach(() => {\n    cy.viewport(550, 750);\n    cy.visit(\"http://localhost:5173/register\");\n    cy.url().should(\"include\", \"/register\");\n  });\n\n  it(\"should display the registration form with expected content\", () => {\n    cy.contains(\"Create an Account\").should(\"be.visible\");\n\n    cy.get(\"label\").contains(\"Full Name\").should(\"be.visible\");\n    cy.get(\"input#fullname\")\n      .should(\"be.visible\")\n      .should(\"have.attr\", \"placeholder\", \"John Doe\");\n\n    cy.get(\"label\").contains(\"Email address\").should(\"be.visible\");\n    cy.get(\"input#email\")\n      .should(\"be.visible\")\n      .should(\"have.attr\", \"placeholder\", \"hello@example.com\");\n\n    cy.get(\"label\").contains(\"Password\").should(\"be.visible\");\n    cy.get(\"input#password\")\n      .should(\"be.visible\")\n      .should(\"have.attr\", \"placeholder\", \"••••••••\");\n\n    cy.get(\"label\").contains(\"Confirm Password\").should(\"be.visible\");\n    cy.get(\"input#confirmPassword\")\n      .should(\"be.visible\")\n      .should(\"have.attr\", \"placeholder\", \"••••••••\");\n\n    cy.get(\"input#terms\").should(\"exist\");\n    cy.contains(\"Terms and Conditions\").should(\"be.visible\");\n    cy.get(\"button\").contains(\"Create Account\").should(\"be.visible\");\n    cy.contains(\"Already have an account?\").should(\"be.visible\");\n  });\n\n  it(\"should accept valid registration input values\", () => {\n    cy.get(\"input#fullname\")\n      .type(\"John Doe\")\n      .should(\"have.value\", \"John Doe\");\n\n    cy.get(\"input#email\")\n      .type(\"test@example.com\")\n      .should(\"have.value\", \"test@example.com\");\n\n    cy.get(\"input#password\")\n      .type(\"Password123!\")\n      .should(\"have.value\", \"Password123!\");\n\n    cy.get(\"input#confirmPassword\")\n      .type(\"Password123!\")\n      .should(\"have.value\", \"Password123!\");\n\n    cy.get(\"input#terms\").check().should(\"be.checked\");\n    cy.get(\"button\").contains(\"Create Account\").should(\"be.enabled\");\n  });\n});`,
              size: 18,
            }),
          ],
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  writeFileSync("./Register-Test-Scenario.docx", buffer);
  console.log("Register-Test-Scenario.docx created");
});
