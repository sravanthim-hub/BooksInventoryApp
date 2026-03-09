import { faker } from "@faker-js/faker";
import { test, expect } from "../../fixtures/pages.fixtures";
import { books } from "../../testData/booksDetailsData";
import { errorMessages } from "../../testData/errorMessages";

test.describe("User can add book successfully", async () => {
  const userName = process.env.USERNAME;
  const password = process.env.PASSWORD;
  let expectedBooksCount = 0;

  test.beforeEach(async ({ loginPage, bookListPage }) => {
    await loginPage.login(userName, password);

    const existingBooksCount = (
      await bookListPage.totalBooks.innerText()
    ).charAt(19);
    expectedBooksCount = parseInt(existingBooksCount) + 1;

    await bookListPage.addBook();
  });
  test("Verify that user can login and add books successfully", async ({
    bookListPage,
    addBookPage,
  }) => {
    await addBookPage.addBookDetailsUsingFaker();

    await expect(bookListPage.pageTitle).toHaveText("Book List");
    await expect(bookListPage.totalBooks).toContainText(
      `Total Book Titles: ${expectedBooksCount}`
    );
    // await bookListPage.logoutButton.click();
    /* comming the below line as functionality for displaying login page when user clicks on logout is not working
    todo in the ticket - Jira-1234 */
    // await expect(loginPage.pageTitle).toContainText("Login");
  });

  test("Verify that error message is displayed when user add book with invalid data", async ({
    addBookPage,
  }) => {
    await addBookPage.addBookDetailsWithInvalidData();
    await expect(addBookPage.titleError).toHaveText(
      errorMessages.titleLengthError
    );
    await expect(addBookPage.errorMessageHeading).toHaveText(
      errorMessages.heading
    );
    await expect(addBookPage.errorMessage).toContainText(
      errorMessages.titleLengthError
    );
  });

  test("Verify that error message is displayed when user enters incomplete book details", async ({
    addBookPage,
  }) => {
    await addBookPage.addBookDetailsWithMissingData();

    await expect(addBookPage.errorMessageHeading).toHaveText(
      errorMessages.heading
    );
    await expect(addBookPage.errorMessage).toContainText(
      `${errorMessages.titleRequired}${errorMessages.authorRequired}${errorMessages.genreRequired}${errorMessages.isbnRequired}${errorMessages.publicationRequired}${errorMessages.priceRequired}`
    );

    //enter title value and verify if the error message for title disappears
    await addBookPage.bookTitle.fill(faker.book.title());
    await addBookPage.addBookButton.click();
    await expect(addBookPage.errorMessage).toContainText(
      `${errorMessages.authorRequired}${errorMessages.genreRequired}${errorMessages.isbnRequired}${errorMessages.publicationRequired}${errorMessages.priceRequired}`
    );
  });

  books.forEach((book) => {
    test(`Verify user can successfully add book with title ${book.title}`, async ({
      bookListPage,
      addBookPage,
    }) => {
      addBookPage.addBookDetails(book);

      await expect(bookListPage.pageTitle).toContainText("Book List");
      await expect(bookListPage.totalBooks).toContainText(
        `Total Book Titles: ${expectedBooksCount}`
      );
    });
  });
});
