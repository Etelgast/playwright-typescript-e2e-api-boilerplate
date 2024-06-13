import { Locator, Page } from "@playwright/test"

export type ComponentProps = {
    page: Page
    locator: Locator
    name?: string
}