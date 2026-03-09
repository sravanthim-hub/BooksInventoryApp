import { Locator, Page } from "@playwright/test";

export default class EditBookPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly genre: Locator;
  readonly title: Locator;
  readonly author: Locator;
  readonly isbn: Locator;
  readonly publicationDate: Locator;
  readonly price: Locator;
  readonly saveChanges: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[class="text-3xl font-bold mb-6"]');
    this.genre = page.locator('[name="genre"]');
    this.title = page.locator('[name="title"]');
    this.author = page.locator('[name="author"]');
    this.isbn = page.locator('[name="isbn"]');
    this.publicationDate = page.locator('[name="publicationDate"]');
    this.price = page.locator('[name="price"]');
    this.saveChanges = page.getByRole("button", { name: "Save Changes" });
  }

  async editBookDetails(fieldToEdit, fieldValue) {
    switch (fieldToEdit) {
      case "title":
        await this.editBookTitle(fieldValue);
        break;
      case "author":
        await this.editBookAuthor(fieldValue);
        break;
      case "genre":
        await this.editBookGenre(fieldValue);
        break;
      case "isbn":
        await this.editISBN(fieldValue);
        break;
      case "publicationDate":
        await this.editpublicationDate(fieldValue);
        break;
      case "price":
        await this.editPrice(fieldValue);
        break;
      default:
        await console.log("invalid field to edit");
    }
    await this.saveChanges.click();
  }

  async editBookTitle(titleValue) {
    await this.title.fill(titleValue);
  }
  async editBookAuthor(authorValue) {
    await this.author.fill(authorValue);
  }
  async editBookGenre(genreValue) {
    await this.genre.fill(genreValue);
  }
  async editISBN(isbnValue) {
    await this.isbn.fill(isbnValue);
  }
  async editpublicationDate(publicationDateValue) {
    await this.publicationDate.fill(publicationDateValue);
  }
  async editPrice(priceValue) {
    await this.price.fill(priceValue);
  }
}
