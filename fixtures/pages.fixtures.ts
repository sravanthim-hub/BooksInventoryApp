import { test as base } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import BookListPage from "../pages/BookListPage";
import AddBookPage from "../pages/AddBookPage";
import BasePage from "../pages/BasePage";
import EditBookPage from "../pages/EditBookPage";
import Accessibility from "../utils/accessibility";

type MyFixtures = {
  basePage: BasePage;
  loginPage: LoginPage;
  bookListPage: BookListPage;
  addBookPage: AddBookPage;
  editBookPage: EditBookPage;
  accessibility: Accessibility;
};

export const test = base.extend<MyFixtures>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  bookListPage: async ({ page }, use) => {
    await use(new BookListPage(page));
  },
  addBookPage: async ({ page }, use) => {
    await use(new AddBookPage(page));
  },
  editBookPage: async ({ page }, use) => {
    await use(new EditBookPage(page));
  },
  accessibility: async ({ page }, use) => {
    await use(new Accessibility(page));
  },
});

export { expect } from "@playwright/test";
