import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Link } from "../components/Link";

export class WelcomePage extends BasePage {
    loginLink: Link
    signUpLink: Link
    forgotPasswordLink: Link

    constructor(public page: Page) {
        super(page)

        this.loginLink = new Link({page, locator: this.page.getByRole('link', {name: 'Login'}), name: 'Login'})
        this.signUpLink = new Link({page, locator: this.page.getByRole('link', {name: 'Create an account'}), name: 'Create an account'})
        this.forgotPasswordLink = new Link({page, locator: this.page.getByRole('link', {name: 'Forgot your password?'}), name: 'Forgot your password'})
    }

    async openLoginPage(): Promise<void> {
        await this.loginLink.click()
    }

    async openSignUpPage(): Promise<void> {
        await this.signUpLink.click()
    }

    async openForgotPasswordPage(): Promise<void> {
        await this.forgotPasswordLink.click()
    }
}