import { test } from "../../fixtures/pages.fixtures";

test.describe("Accessibility violation checks", async () => {
  const userName = process.env.USERNAME;
  const password = process.env.PASSWORD;
  test("Check accessibility violations for login page", async ({
    page,
    accessibility,
  }) => {
    await page.goto("/login");
    await accessibility.a11y(page);
  });

  //todo - Jira-1234 skipping the test as accessibility violations reported, enable once its fixed in Jira-1234
  test.skip("Check accessibility violations for Book List page", async ({
    page,
    loginPage,
    accessibility,
  }) => {
    await loginPage.login(userName, password);
    await accessibility.a11y(page);
  });

  //todo - Jira-4567 skipping the test as accessibility violations reported, enable once its fixed in Jira-4567
  test.skip("Check accessibility violations for Add Book page", async ({
    page,
    loginPage,
    bookListPage,
    accessibility,
  }) => {
    await loginPage.login(userName, password);
    await bookListPage.addBook();
    await accessibility.a11y(page);
  });
});
