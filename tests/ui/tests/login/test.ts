import {test as base, mergeTests} from "@playwright/test";
import { ContextPagesFixture, contextPageFixture } from "../../lib/fixtures/context-pages";
import { NotesPagesFixture, notesPagesFixture } from "../../lib/fixtures/pages.fixture";
import {combineFixtures} from '../../lib/utils/fixtures'



export const loginTest = base.extend<ContextPagesFixture, NotesPagesFixture>(
    combineFixtures(contextPageFixture, notesPagesFixture)
)



