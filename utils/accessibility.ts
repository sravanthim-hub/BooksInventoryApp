import AxeBuilder from "@axe-core/playwright";
import { expect } from "../fixtures/pages.fixtures";
import { Page } from "@playwright/test";

export default class Accessibility {
  public wgca = "wcag2aa"; // this can be changed as per the project requirement
  readonly page: Page;
  constructor(page) {
    this.page = page;
  }
  async a11y(page) {
    const axe = new AxeBuilder({ page }).withTags(this.wgca);
    const { violations } = await axe.analyze();
    console.log(violations);
    expect(violations).toHaveLength(0);

    console.log(`${violations.length} were identified`);
  }
}
