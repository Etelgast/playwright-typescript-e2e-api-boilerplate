import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Input } from "../components/Input";
import { IGeneratedRegistrationForm } from "../lib/types/generator";
import { Button } from "../components/Button";
import { Title } from "../components/Title";
import { allure } from "allure-playwright";
import { Link } from "../components/Link";
import { IUserData } from "../lib/types/user";

export class RegisterPage extends BasePage {
  emailInput: Input;
  nameInput: Input;
  passwordInput: Input;
  confirmPasswordInput: Input;
  submitButton: Button;
  accountCreatedTitle: Title;
  loginLink: Link;
  errorTitle: Title;

  constructor(public page: Page) {
    super(page);

    this.emailInput = new Input({
      page,
      locator: this.page.getByTestId("register-email"),
      name: "Email",
    });
    this.nameInput = new Input({
      page,
      locator: this.page.getByTestId("register-name"),
      name: "Name",
    });
    this.passwordInput = new Input({
      page,
      locator: this.page.getByTestId("register-password"),
      name: "Password",
    });
    this.confirmPasswordInput = new Input({
      page,
      locator: this.page.getByTestId("register-confirm-password"),
      name: "Confirm password",
    });
    this.submitButton = new Button({
      page,
      locator: this.page.getByTestId("register-submit"),
      name: "Register",
    });
    this.accountCreatedTitle = new Title({
      page,
      locator: this.page.getByText("User account created"),
      name: "Account Created",
    });
    this.loginLink = new Link({
      page,
      locator: this.page.getByRole("link", { name: "Click here to Log In" }),
      name: "Click here to Log In",
    });
  }

  async fillRegistrationForm(testingData: IUserData) {
    const inputMap = {
      email: this.emailInput,
      name: this.nameInput,
      password: this.passwordInput,
      confirmPassword: this.confirmPasswordInput,
    };

    for (const [key, input] of Object.entries(inputMap)) {
      await input.fill(testingData[key]);
      await input.shouldHaveValue(testingData[key]);
    }

    await this.submitButton.click();
  }

  async redirectToLoginPageAfterRegistration() {
    await this.loginLink.click();
  }

  async submitRegistrationFormWithoutFilling(): Promise<void> {
    const messages = [
      "Email address",
      "User name",
      "Password",
      "Confirm Password",
    ];
    await this.submitButton.click();

    for (const message of messages) {
      await expect(
        this.page.getByText(`${message} is required`, { exact: true }),
        { message: `Error message is visible for ${message} input` }
      ).toBeVisible();
    }
  }
}
