import { Locator, Page, expect } from "@playwright/test"
import type {ComponentProps} from '../lib/types/component'
import { allure } from "allure-playwright"

export abstract class Component {
    page: Page
    locator: Locator
    private name: string | undefined
    
    constructor({ page, locator, name }: ComponentProps) {
        this.page = page
        this.locator = locator
        this.name = name
    }

    get typeOf(): string {
        return 'component'
    }


    get componentName(): string {
        if (!this.name) {
          throw Error('Provide "name" property to use "componentName"');
        }
        return this.name;
    }

    getLocator() {
        return this.locator
    }

    async getLocatorByRole(name: string) {
        await allure.step(`Getting the ${name} locator by Role`, async() => {
            return this.page.getByRole('link', {name: name})
        })
    }


    async click(): Promise<void> {
        await allure.step(`Clicking on the ${this.typeOf} component with name ${this.componentName}`, async() => {
            await this.locator.click()
        })
    }

    async shouldBeVisible() {
        await allure.step(`Checking that ${this.typeOf} "${this.componentName}" is visible`, async() => {
            const locator = this.getLocator()
            expect(locator).toBeVisible()
        })
    }
}