import { allure } from "allure-playwright";
import { Routes } from "../../lib/router/routes";
import { loginTest as test } from "./test";

test.beforeEach(async({loginPage}) => {
    await allure.tags("UI","Smoke", "Login Page")
    await loginPage.visit(Routes.Login)
})

test("Log in as an existing user", async({loginPage, registeredUser, notesPage}) => {
    await loginPage.logIn(registeredUser)
    await notesPage.homeLink.shouldBeVisible()
})