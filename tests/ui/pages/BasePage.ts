import {test, expect, Page} from '@playwright/test'
import {allure} from 'allure-playwright'

export class BasePage {
    constructor(public page: Page) {
        this.page = page
    }

    async visit(url: string): Promise<void> {
        await allure.step(`Opening  the url ${url}`, async() => {
            await this.page.goto(url, {waitUntil: 'domcontentloaded', timeout: 1000000})
        })
    }

    async shouldBeOpened(endpoint: string): Promise<void> {
        await allure.step(`Page with the ${endpoint} endpoint should be opened`, async() => {
            await expect(this.page, {message: `Page with the ${endpoint} endpoint is opened`}).toHaveURL(new RegExp(`${endpoint}`))
        })
    }
}