import { test } from "../../fixtures/pages.fixtures";

test.describe("User can add book successfully", async () => {
  const userName = process.env.USERNAME;
  const password = process.env.PASSWORD;

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login(userName, password);
  });

  test("Verify User can edit the book details", async ({ bookListPage }) => {
    const bookTitle = await bookListPage.getExistingBookTitle();
    await bookListPage.deleteBook(bookTitle);
  });
});
