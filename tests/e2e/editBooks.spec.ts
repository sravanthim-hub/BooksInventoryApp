import { expect, test } from "../../fixtures/pages.fixtures";

test.describe("User can add book successfully", async () => {
  const userName = process.env.USERNAME;
  const password = process.env.PASSWORD;

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login(userName, password);
  });

  test("Verify User can edit the book details", async ({
    bookListPage,
    editBookPage,
  }) => {
    const bookTitle = await bookListPage.getExistingBookTitle();
    await bookListPage.clickOnEditBook(bookTitle);
    await expect(editBookPage.pageTitle).toContainText("Edit book details");
    await editBookPage.editBookDetails("isbn", "1234567890");
    await expect(bookListPage.pageTitle).toContainText("Book List");
    const updatedISBN = await bookListPage.getISBNValue(bookTitle);
    await expect(updatedISBN).toContain("1234567890");
  });
});
