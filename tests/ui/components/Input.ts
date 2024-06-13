import { Locator, expect } from "@playwright/test";
import { Component } from "./BaseComponent";
import { allure } from "allure-playwright";

export class Input extends Component {
    
    get TypeOf(): string {
        return 'Input'
    }

    async fill(value: string) {
        await allure.step(`Fill ${this.typeOf} "${this.componentName}" to value "${value}"`, async() => {
            const locator = this.getLocator()
            await locator.fill(value)
        })
    }

    async shouldHaveValue(value: string) {
        await allure.step(`Checking that ${this.typeOf} "${this.componentName}" has a value "${value}"`, async() => {
            const locator = this.getLocator()
            expect(locator, {message: `${this.componentName}" has a value "${value}"`}).toHaveValue(value)
        })
    }
}