import { welcomeTest as test } from "./test";
import { Routes } from "../../lib/router/routes";
import { allure } from "allure-playwright";

test.beforeEach(async({welcomePage}) => {
    await allure.tags("UI","Smoke", "Welcome Page")
    await allure.severity('Critical')
    await welcomePage.visit(Routes.Welcome)
})

test("Opening the Login page from the Welcome Page", async({ welcomePage}) => {
    await welcomePage.openLoginPage()
    await welcomePage.shouldBeOpened(Routes.Login)
})

test("Opening the Sign Up page from the Welcome Page", async({welcomePage}) => {
    await welcomePage.openSignUpPage()
    await welcomePage.shouldBeOpened(Routes.Register)
})

test("Opening the Forgot Password page from the Welcome Page", async({welcomePage}) => {
    await welcomePage.openForgotPasswordPage()
    await welcomePage.shouldBeOpened(Routes.ForgotPassword)
})