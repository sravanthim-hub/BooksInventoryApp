import { Locator, Page } from "@playwright/test";

export default class LoginPage {
  readonly page: Page;
  readonly userName: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly pageTitle: Locator;
  readonly errorMessageHeading: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator("#login-heading");
    this.userName = page.locator("#username");
    this.password = page.locator("#password");
    this.loginButton = page.getByText("Log In");
    this.errorMessageHeading = page.locator('[class="font-bold"]');
    this.errorMessage = page.locator('[class="list-disc pl-5"]');
  }

  async login(userName, password) {
    await this.page.goto("/login");
    await this.userName.fill(userName);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
