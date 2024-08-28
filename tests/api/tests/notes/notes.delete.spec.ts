import { expect } from '@playwright/test'
import {authClient as test} from './../../lib/fixtures/auth.setup'
import { generateNote } from '../../lib/data/note'
import { createNote } from '../../lib/fixtures/create.note.fixture'
import { APIRoutes } from '../../lib/utils/APIRoutes'
import { allure } from 'allure-playwright'


test.beforeEach(async() => {
    await allure.tags("API", "Smoke", "DELETE")
})

test("[DELETE] Delete a note by ID", async({API, authUser}) => {
    const note = generateNote({ min: 4, max: 15 }, { min: 4, max: 30 }, "Home");
    const createdNote = await createNote(API, authUser.token, note)

    const deleteRes = await API.deleteRequest(`${APIRoutes.Notes}/${createdNote.id}`, authUser.token)
    expect(deleteRes.status()).toBe(200)

    const getRes = await API.getRequest(`${APIRoutes.Notes}/${createdNote.id}`, authUser.token)
    expect(getRes.status()).toBe(404)
})

test("[DELETE] Delete a note by incorrect ID", {tag: ['@smoke', '@customer']}, async({API, authUser}) => {
    const note = generateNote({ min: 4, max: 15 }, { min: 4, max: 30 }, "Home");
    await createNote(API, authUser.token, note)
    const noteId = '123456'
    
    const deleteRes = await API.deleteRequest(`${APIRoutes.Notes}/${noteId}`, authUser.token)
    expect(deleteRes.status()).toBe(400)
})

test("[DELETE] Delete a note by ID without authentication token", {tag: ['@regress', '@ticket']}, async({API, authUser}) => {
    const note = generateNote({ min: 4, max: 15 }, { min: 4, max: 30 }, "Home");
    const createdNote = await createNote(API, authUser.token, note)
    
    const deleteRes = await API.deleteRequest(`${APIRoutes.Notes}/${createdNote.id}`, undefined)
    expect(deleteRes.status()).toBe(401)
})