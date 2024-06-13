import { expect } from '@playwright/test'
import {authClient as test} from './../../lib/fixtures/auth.setup'
import { allure } from 'allure-playwright'
import { generateNote } from '../../lib/data/note'
import { createNote } from '../../lib/fixtures/create.note.fixture'
import { APIRoutes } from '../../lib/utils/APIRoutes'


test.describe("[GET] Get operations with notes", async() => {
    test.beforeEach(async() => {
        await allure.tags('API', 'Smoke', 'GET')
        await allure.severity("Critical")
    })

    test("[GET] Get all notes", async({API, authUser}) => {
        const res = await API.getRequest(APIRoutes.Notes, authUser.token)
        expect(res.status()).toBe(200)
    })
    
    test("[GET] Get all notes without authentication token", async({API}) => {
        const res = await API.getRequest(APIRoutes.Notes)
        expect(res.status()).toBe(401)
    })
    
    test("[GET] Get a note by correct ID", async({API, authUser}) => {
        const note = generateNote({ min: 4, max: 15 }, { min: 4, max: 30 }, "Home");
        const createdNote = await createNote(API, authUser.token, note)
        
        const getNoteResponse = await API.getRequest(`${APIRoutes.Notes}/${createdNote.id}`, authUser.token)
        const getNoteData = await getNoteResponse.json()
        await allure.attachment("ATTACH_GETTING_NOTE", JSON.stringify(getNoteData), {contentType: 'application/json'})
        
        expect(getNoteResponse.status()).toBe(200)
        expect(getNoteData.data).toEqual(expect.objectContaining(({
            id: createdNote.id,
            title: note.title,
            description: note.description,
          })))
    })
    
    test("[GET] Get a note by wrong ID", async({API, authUser}) => {
        const id = '123456'
        const res = await API.getRequest(`${APIRoutes.Notes}/${id}`, authUser.token)
        expect(res.status()).toBe(400)
    })
})

