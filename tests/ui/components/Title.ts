import { allure } from "allure-playwright";
import { Component } from "./BaseComponent";
import { expect } from "@playwright/test";

export class Title extends Component {
    get TypeOf(): string {
        return 'Title'
    }

    async shouldHaveText(text: string) {
        await allure.step(`Checking that ${this.typeOf} "${this.componentName}" has a text "${text}"`, async() => {
            const locator = this.getLocator()
            expect(locator).toHaveText(text)
        })
    }
}