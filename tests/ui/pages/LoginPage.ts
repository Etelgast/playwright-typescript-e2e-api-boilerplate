import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export class LoginPage extends BasePage {
    emailInput: Input
    passwordInput: Input
    submitButton: Button

    constructor(public page: Page) {
        super(page)

        this.emailInput = new Input({page, locator: this.page.getByTestId("login-email"), name: 'Email'})
        this.passwordInput = new Input({page, locator: this.page.getByTestId("login-password"), name: 'Password'})
        this.submitButton = new Button({page, locator: this.page.getByTestId("login-submit"), name: 'Login'})
    }

    async logIn(registeredUser) {
        await this.emailInput.fill(registeredUser.email)
        await this.passwordInput.fill(registeredUser.password)
        await this.submitButton.click()
        await this.page.waitForSelector('[data-testid="home"]')
    }
}