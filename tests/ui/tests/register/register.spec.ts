import { registerTest as test } from "./test";
import { Routes } from "../../lib/router/routes";
import { allure } from "allure-playwright";
import { createRegistrationFormData } from "../../lib/utils/generator/registrationForm";

test.beforeEach(async({registerPage}) => {
    await allure.tags("UI", "Smoke", "Register Page")
    await allure.severity("Critical")
    await registerPage.visit(Routes.Register)
})

test("Successfully create a new user", async({registerPage}) => {
    const testingData = createRegistrationFormData({passwordSize: 15, confirmPasswordIsDifferent: false})
    await registerPage.fillRegistrationForm(testingData)
    await registerPage.userShouldBeCreated()
})

test("Open the Login page after successfully creation a new user", async({registerPage, loginPage}) => {
    const testingData = createRegistrationFormData({passwordSize: 15, confirmPasswordIsDifferent: false})
    await registerPage.fillRegistrationForm(testingData)
    await registerPage.redirectToLoginPageAfterRegistration()
    await loginPage.shouldBeOpened(Routes.Login)
})

test("Submit a registration form with empty inputs", async({registerPage}) => {
    await registerPage.submitRegistrationFormWithoutFilling()
})