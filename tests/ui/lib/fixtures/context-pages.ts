import { Fixtures, Page } from "@playwright/test"
import {mockStaticResources} from '../utils/mocks/static-mock'

export type ContextPagesFixture = {
    contextPage: Page
    page: Page
}

export const contextPageFixture: Fixtures<ContextPagesFixture> = {
    contextPage: async({page}, use) => {
        await mockStaticResources(page)
        await use(page)
    }
}