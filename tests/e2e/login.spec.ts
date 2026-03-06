import { faker } from "@faker-js/faker";
import { expect, test } from "../../fixtures/pages.fixtures";
import { errorMessages } from "../../testData/errorMessages";

test.describe("Login tests", async () => {
  test("verify login fails when user enters invalid credentials", async ({
    loginPage,
  }) => {
    await loginPage.login(faker.internet.username(), faker.internet.password());
    await expect(loginPage.errorMessageHeading).toContainText(
      errorMessages.loginErrorHeading
    );
    await expect(loginPage.errorMessage).toContainText(
      errorMessages.loginError
    );
  });
});
