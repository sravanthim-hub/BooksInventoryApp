import { Locator, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { formatToYYYYMMDD } from "../utils/dateUtils";
import { BooksData } from "../testData/DataModel/booksData";

export default class AddBookPage {
  readonly page: Page;
  readonly bookTitle: Locator;
  readonly author: Locator;
  readonly genre: Locator;
  readonly isbn: Locator;
  readonly publicationDate: Locator;
  readonly price: Locator;
  readonly addBookButton: Locator;
  readonly errorMessageHeading: Locator;
  readonly errorMessage: Locator;
  readonly titleError: Locator;
  readonly publicationDateValue: string;

  constructor(page: Page) {
    this.publicationDateValue = formatToYYYYMMDD(faker.date.recent());

    this.page = page;
    this.bookTitle = page.locator("#title");
    this.author = page.locator("#author");
    this.genre = page.locator("#genre");
    this.isbn = page.locator("#isbn");
    this.publicationDate = page.getByRole("textbox", {
      name: "Publication Date:",
    });
    this.price = page.locator("#price");
    this.addBookButton = page.locator('button[type="submit"]');
    this.errorMessageHeading = page.locator('h3[class="font-bold"]');
    this.errorMessage = page.locator('ul[class="list-disc pl-5"]');
    this.titleError = page.locator("#title-error");
  }

  async addBookDetailsUsingFaker() {
    await this.bookTitle.fill(faker.book.title().substring(0, 15));
    await this.author.fill(faker.book.author());
    await this.genre.selectOption({
      index: faker.number.int({ min: 1, max: 5 }),
    });
    await this.isbn.fill(faker.book.series());
    await this.publicationDate.fill(this.publicationDateValue);
    await this.price.fill(faker.finance.amount());
    await this.addBookButton.click();
  }

  async addBookDetailsWithMissingData() {
    await this.addBookButton.click();
  }

  async addBookDetailsWithInvalidData() {
    await this.bookTitle.fill(faker.string.alpha({ length: 21 }));
    await this.author.fill(faker.book.author());
    await this.genre.selectOption({
      index: faker.number.int({ min: 1, max: 5 }),
    });
    await this.isbn.fill("test");
    await this.publicationDate.fill(this.publicationDateValue);
    await this.price.fill(faker.finance.amount());
    await this.addBookButton.click();
  }

  async addBookDetails(book: BooksData) {
    await this.bookTitle.fill(book.title);
    await this.author.fill(book.author);
    await this.genre.selectOption(book.genre);
    await this.publicationDate.fill(book.publicationDate);
    await this.isbn.fill(book.isbn);
    await this.price.fill(book.price);
    await this.addBookButton.click();
  }
}
