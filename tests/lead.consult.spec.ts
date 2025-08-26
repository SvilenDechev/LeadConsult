import { test, Page, BrowserContext, Locator, expect } from "@playwright/test";
import { elementsSnapshotComparison } from "../lib/visualComparison";
import { expectVisible, fill } from "../lib/globals";
import { userDetails } from "../testData";

let page: Page;
let context: BrowserContext;

const buttons: string[] = [
  "Home",
  "About us",
  "Services",
  "Products",
  "Customers",
  "Our Partners",
  "Careers",
  "Newsroom",
  "Contact us",
];

test.describe.parallel("Lead consult public page validations:", () => {
  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://www.leadconsult.eu/");
  });

  test("validate header navigation buttons", async ({}, testInfo) => {
    const header: Locator = page.locator("#header-container");
    await expectVisible(header);
    for (const button of buttons) {
      await expect(header.getByText(button, { exact: false })).toBeVisible();
    }
    await elementsSnapshotComparison({
      page,
      testTitle: testInfo.title,
      elements: [header],
    });
  });

  test("About Us section should contain 'team' word", async () => {
    await page.locator("#menu-item-5815").getByText("About us").click();
    await page.getByRole("link", { name: "Our Company" }).first().click();
    await expect(page.locator("body")).toContainText(/team/i); // /team/i = regex that searches for "team", where the "i" flag makes it case-insensitive (Team, TEAM, team)
  });

  test("Contact section should contain send button", async () => {
    await page
      .locator("#menu-item-5819")
      .getByRole("link", { name: "Contact us" })
      .click();
    await expectVisible(page.getByRole("button", { name: "Send" }));
  });

  test("The user should NOT be able to send message if not pass reCAPTCHA method", async () => {
    await page.goto("https://www.leadconsult.eu/contact-us/");

    await fill(page.getByLabel("Your Name*"), userDetails.name);
    await fill(page.getByLabel("Your Email*"), userDetails.email);
    await fill(page.getByLabel("Your phone number"), userDetails.phone);
    await fill(page.getByLabel("Your Message*"), userDetails.message);
    await page
      .getByLabel("Kontaktformular")
      .getByLabel("I agree and allow LEAD")
      .check();
    await page.getByRole("button", { name: "Send" }).click();
    await expect(
      page.getByLabel("Kontaktformular").getByText("Please verify that you are not a robot.")
    ).toBeVisible();
  });

  test.afterEach(async () => {
    await context.close();
  });
});
