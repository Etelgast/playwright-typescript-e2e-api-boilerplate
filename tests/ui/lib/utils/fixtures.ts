import { Fixtures } from "@playwright/test";

export const combineFixtures = (...args: Fixtures[]): Fixtures => {
    return args.reduce((acc, fixture) => ({...acc, ...fixture}), {})
}