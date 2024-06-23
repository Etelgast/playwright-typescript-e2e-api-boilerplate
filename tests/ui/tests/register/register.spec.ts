import { registerTest as test } from "./test";
import { Routes } from "../../lib/router/routes";
import { allure } from "allure-playwright";
import InvalidUserData from "../../lib/data/user/invalidUserData";
import ValidUserData from "../../lib/data/user/validUserData";

test.beforeEach(async ({ registerPage }) => {
  await allure.tags("UI", "Smoke", "Register Page");
  await allure.severity("Critical");
  await registerPage.visit(Routes.Register);
});

test.describe("Positive registration scenarios", async () => {
  let validUserData: ValidUserData;

  test.beforeEach(() => {
    validUserData = new ValidUserData();
  });

  test("Successfully create a new user", async ({ registerPage }) => {
    const testingData = validUserData.create();
    await registerPage.fillRegistrationForm(testingData);
    await registerPage.accountCreatedTitle.shouldBeVisible();
  });

  test("Open the Login page after successfully creation a new user", async ({
    registerPage,
    loginPage,
  }) => {
    const testingData = validUserData.create();

    await registerPage.fillRegistrationForm(testingData);
    await registerPage.redirectToLoginPageAfterRegistration();
    await loginPage.shouldBeOpened(Routes.Login);
  });
});

test.describe("Negative registration scenarios with an invalid data", () => {
  let invalidUserData: InvalidUserData;

  test.beforeEach(() => {
    invalidUserData = new InvalidUserData({
      email: { isCorrectSchema: true },
      name: { isCorrectSchema: true },
      password: { isCorrectSchema: true, options: { length: 10 } },
    });
  });

  test("Submit a registration form with a short password", async ({
    registerPage,
  }) => {
    for (const len of [1, 5]) {
      invalidUserData.updatePasswordLength(len);
      const userData = invalidUserData.create();
      const confirmPassword = userData.password;
      await registerPage.fillRegistrationForm({ ...userData, confirmPassword });
      await registerPage.passwordInput.shouldHaveErrorMessage();
    }
  });

  test("Submit a registration form with empty inputs", async ({
    registerPage,
  }) => {
    await registerPage.submitRegistrationFormWithoutFilling();
  });
});
