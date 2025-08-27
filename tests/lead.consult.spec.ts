import { test, Page, BrowserContext, Locator, expect } from "@playwright/test";
import { elementsSnapshotComparison } from "../lib/visualComparison";
import { click, expectVisible, fill } from "../lib/globals";
import { userDetails } from "../testData";
import { Helpers } from "../lib/helper";

let page: Page;
let context: BrowserContext;
let helpers: Helpers;

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
    helpers = new Helpers(page);

    await page.goto("https://www.leadconsult.eu/");
  });

  test("validate header navigation buttons is visible - 1", async ({}, testInfo) => {
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

  test("validate that header navigation buttons navigate to the correct pages - 1", async ({}, testInfo) => {
   await page.locator('#menu-item-5815').getByText('About us').hover();
   await helpers.clickLinkByName('Our Company');
   await expect(page).toHaveURL(/.*about-us/); //regex that searches for "about-us" in url
   await expectVisible(page.getByText('A little bit about who we are'));
   
   await helpers.checkNavigationButtons('Services', 'services', 'Our Services');
   await helpers.checkNavigationButtons('Products', 'products', 'Our Products');
  });

  test("About Us section should contain 'team' word - 2", async () => {
    await click(page.getByText("About us"));
    await helpers.clickLinkByName("Our Company");
    await expect(page.locator("body")).toContainText(/team/i); // /team/i = regex that searches for "team", where the "i" flag makes it case-insensitive (Team, TEAM, team)
  });

  test("Contact section should contain send button - 3", async () => {
    await helpers.clickLinkByName("Contact us");
    await expectVisible(page.getByRole("button", { name: "Send" }));
  });

  test("The user should NOT be able to send message if not pass reCAPTCHA method - 4 $ 5 & 6", async () => {
    await helpers.clickLinkByName("Contact us");
    await fill(page.getByLabel("Your Name*"), userDetails.name);
    await fill(page.getByLabel("Your Email*"), userDetails.email);
    await fill(page.getByLabel("Your phone number"), userDetails.phone);
    await fill(page.getByLabel("Your Message*"), userDetails.message);
    await page.getByLabel("Kontaktformular").getByLabel("I agree and allow LEAD").check();
    await page.getByRole("button", { name: "Send" }).click();
    await expectVisible(page.getByLabel("Kontaktformular").getByText("Please verify that you are not a robot."));
  });

  test.afterEach(async () => {
    await context.close();
  });
});
