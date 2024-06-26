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
      emailCondition: { isCorrectSchema: true },
      name: { isCorrectSchema: true },
      passwordCondition: { isCorrectSchema: true, options: { length: 10 } },
      isConfirmPasswordDifferent: false
    });
  });

  test("Submit a registration form with a short password", async ({
    registerPage,
  }) => {
    for (const len of [1, 5]) {
      invalidUserData.updatePasswordLength(len);
      const userData = invalidUserData.create();
      await registerPage.fillRegistrationForm(userData);
      await registerPage.passwordInput.shouldHaveErrorMessage();
    }
  });

  test("Submit a registration form with an icorrect Confirm Password", async({registerPage}) => {
    invalidUserData.changeConfirmPassword()
    const userData = invalidUserData.create()
    await registerPage.fillRegistrationForm(userData)
    await registerPage.confirmPasswordInput.shouldHaveErrorMessage()
  })

  test("Submit a registration form with empty inputs", async ({
    registerPage,
  }) => {
    await registerPage.submitRegistrationFormWithoutFilling();
  });
});
