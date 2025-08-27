import { Page, expect } from "@playwright/test";
import { click, expectVisible } from "./globals";

export class Helpers {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickLinkByName(linkName: string) {
    await click(this.page.getByRole('link', { name: `${linkName}`, exact: true }));
  }

   async checkNavigationButtons(section:string, expectedUrlPart: string, expectedText:string) {
    const urlRegex = new RegExp(`.*${expectedUrlPart}.*`);
    
    await click(this.page.getByRole("link", { name: `${section}` }));
    await expect(this.page).toHaveURL(urlRegex);
    await expectVisible(this.page.getByText(expectedText));
  }
}
