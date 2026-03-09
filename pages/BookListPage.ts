import { Locator, Page } from "@playwright/test";

export default class BookListPage {
  readonly page: Page;
  readonly addBookButton: Locator;
  readonly editBookButton: Locator;
  readonly pageTitle: Locator;
  readonly welcomeMessage: Locator;
  readonly logoutButton: Locator;
  readonly previousButton: Locator;
  readonly nextButton: Locator;
  readonly totalBooks: Locator;
  readonly bookRow: Locator;
  readonly bookTable: Locator;
  readonly deleteBookButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[class="text-3xl font-bold mb-6"]');
    this.addBookButton = page.getByText("Add Book");
    this.welcomeMessage = page.locator('[class="text-lg font-bold"]');
    this.logoutButton = page.getByText("Log Out");
    this.totalBooks = page.locator('[class="text-lg font-semibold"]');
    this.editBookButton = page.getByRole("button", { name: "Edit" });
    this.bookTable = page.locator("table tbody");
    this.bookRow = page.locator("table tbody tr");
    this.deleteBookButton = page.getByRole("button", { name: "Delete" });
  }

  async addBook() {
    this.addBookButton.click();
  }

  async getExistingBookTitle() {
    return await this.bookTable.locator("tr td").first().innerText(); // ideally elements should have a unique locator so we don't have to use first/nth as this may cause problem if order of elements changes
  }
  async clickOnEditBook(bookTitle) {
    const selectedBookRow = await this.bookRow.filter({ hasText: bookTitle });
    await selectedBookRow.getByText("Edit").click();
  }

  async deleteBook(bookTitle) {
    const selectedBookRow = await this.bookRow.filter({ hasText: bookTitle });
    await selectedBookRow.getByRole("button", { name: "Delete" }).click();
  }

  async getISBNValue(bookTitle) {
    const selectedBookRow = await this.bookRow.filter({ hasText: bookTitle });
    return await selectedBookRow.locator("td").nth(3).innerText();
  }
}
