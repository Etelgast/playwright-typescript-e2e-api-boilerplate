import { Locator, expect } from "@playwright/test";
import { Component } from "./BaseComponent";
import { allure } from "allure-playwright";

export class Input extends Component {
  get TypeOf(): string {
    return "Input";
  }

  async fill(value: string) {
    await allure.step(
      `Fill ${this.typeOf} "${this.componentName}" to value "${value}"`,
      async () => {
        const locator = this.getLocator();
        await locator.fill(value);
      }
    );
  }

  async shouldHaveValue(value: string) {
    await allure.step(
      `Checking that ${this.typeOf} "${this.componentName}" has a value "${value}"`,
      async () => {
        const locator = this.getLocator();
        expect(locator, {
          message: `${this.componentName} has a value "${value}"`,
        }).toHaveValue(value);
      }
    );
  }

  async shouldHaveErrorMessage() {
    await allure.step(
      `Checking that ${this.typeOf} "${this.componentName}" has an error message`,
      async () => {
        if (this.componentName === "Password") {
          await expect(
            this.page.getByText(
              `${this.componentName} should be between 6 and 30 characters`,
              { exact: true }
            ),
            {
              message: `Error message is visible for ${this.componentName} input`,
            }
          ).toBeVisible();
        }
      }
    );
  }
}
