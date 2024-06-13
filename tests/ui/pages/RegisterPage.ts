import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Input } from "../components/Input";
import { IGeneratedRegistrationForm } from "../lib/types/generator";
import { Button } from "../components/Button";
import {Title} from '../components/Title'
import { allure } from "allure-playwright";
import { Link } from "../components/Link";

export class RegisterPage extends BasePage {
    emailInput: Input
    nameInput: Input
    passwordInput: Input
    confirmPasswordInput: Input
    submitButton: Button
    accountCreatedTitle: Title
    loginLink: Link

    constructor(public page: Page) {
        super(page)

        this.emailInput = new Input({page, locator: this.page.getByTestId('register-email'), name: 'Email Input'})
        this.nameInput = new Input({page, locator: this.page.getByTestId('register-name'), name: 'Name Input'})
        this.passwordInput = new Input({page, locator: this.page.getByTestId('register-password'), name: 'Password Input'})
        this.confirmPasswordInput = new Input({page, locator: this.page.getByTestId('register-confirm-password'), name: 'Confirm Password Input'})
        this.submitButton = new Button({page, locator: this.page.getByTestId('register-submit'), name: 'Register'})
        this.accountCreatedTitle = new Title({page, locator: this.page.getByText('User account created successfully'), name: 'Account Created'})
        this.loginLink = new Link({page, locator: this.page.getByRole('link', {name: 'Click here to Log In'}), name: 'Click here to Log In'})
        
    }

    async fillRegistrationForm(testingData: IGeneratedRegistrationForm) {
        const inputs = [this.emailInput, this.nameInput, this.passwordInput, this.confirmPasswordInput]
        const keys = Object.keys(testingData)

        inputs.forEach((input, index) => {
            input.fill(keys[index])
            input.shouldHaveValue(keys[index])
        })
        this.submitButton.click()
    }

    async userShouldBeCreated() {
        await this.accountCreatedTitle.shouldHaveText('User account created successfully')
    }

    async redirectToLoginPageAfterRegistration() {
        await this.loginLink.click()
    }

    async submitRegistrationFormWithoutFilling(): Promise<void> {
        const messages = ['Email address', 'User name', 'Password', 'Confirm Password']
        await this.submitButton.click()
        
        for(const message of messages) {
            await expect(this.page.getByText(`${message} is required`, {exact: true}), {message: `Error message is visible for ${message} input`}).toBeVisible()
        }
    }
}