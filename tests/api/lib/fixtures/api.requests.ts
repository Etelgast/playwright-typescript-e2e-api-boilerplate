import { test as base } from "@playwright/test";
import { APIClient } from "../utils/APIClient";

export type Client = {
    API: APIClient
}

export const API = base.extend<Client>({
    API: async ({request}, use) => {
        const API = new APIClient(request)
        await use(API)
    }
})