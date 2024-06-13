import { expect } from '@playwright/test'
import {authClient as test} from './../../lib/fixtures/auth.setup'
import { generateNote } from '../../lib/data/note'
import { APIRoutes } from '../../lib/utils/APIRoutes'
import { allure } from 'allure-playwright'


test.describe("[POST] POST operations with notes", async() => {
    test.beforeEach(async() => {
        await allure.tags("API", "Smoke", "POST")
    })

    test("[POST] Create a new note with the given title, description, category", async({API, authUser}) => {
        const CATEGORIES = ['Home', 'Work', 'Personal']
        for(const category of CATEGORIES) {
            const note = generateNote({min: 4, max: 15}, {min: 4, max: 30}, category)
            const res = await API.postRequest(APIRoutes.Notes, note, authUser.token)
            const {data} = await res.json()
            
            expect(res.status()).toBe(200)
            expect(data).toEqual(expect.objectContaining({
                "id": expect.any(String),
                "title": note.title,
                "description": note.description,
                "category": note.category,
                "completed": false
            }))
        }
    })
    
    test("[POST] Create a new note without title", async({API, authUser}) => {
        const CATEGORIES = ['Home', 'Work', 'Personal']
        for(const category of CATEGORIES) {
            const note = generateNote(undefined, {min: 4, max: 50}, category)
            const res = await API.postRequest(APIRoutes.Notes, note, authUser.token)
            expect(res.status()).toBe(400)
        }
    })
    
    test("[POST] Create a new note without description", async({API, authUser}) => {
        const CATEGORIES = ['Home', 'Work', 'Personal']
        for(const category of CATEGORIES) {
            const note = generateNote({min: 4, max: 20}, undefined, category)
            const res = await API.postRequest(APIRoutes.Notes, note, authUser.token)
            expect(res.status()).toBe(400)
        }
    })
    
    test("[POST] Create a new note without category", async({API, authUser}) => {
        const note = generateNote({min: 4, max: 20}, {min: 4, max: 50}, undefined)
        const res = await API.postRequest(APIRoutes.Notes, note, authUser.token)
        expect(res.status()).toBe(400)
    
    })
})