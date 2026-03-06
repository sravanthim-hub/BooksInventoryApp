import { Page } from "@playwright/test";

export default class BasePage {
  readonly page: Page;

  constructor(page) {
    this.page = page;
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState("domcontentloaded");
  }
}
