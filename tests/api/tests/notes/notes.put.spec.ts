import { expect } from '@playwright/test'
import {authClient as test} from './../../lib/fixtures/auth.setup'
import { generateNote } from '../../lib/data/note'
import { createNote } from '../../lib/fixtures/create.note.fixture'
import { APIRoutes } from '../../lib/utils/APIRoutes'
import { allure } from 'allure-playwright'

test.beforeEach(async() => {
    await allure.tags("API", "Smoke", "PUT")
})

test("Update a title and description of existing note", async({API, authUser}) => {
    const CATEGORIES = ['Home', 'Work', 'Personal']
    for(const category of CATEGORIES) {
        const note = generateNote({ min: 4, max: 15 }, { min: 4, max: 30 }, category);
        const createdNote = await createNote(API, authUser.token, note)
        const updatedNote = generateNote({ min: 4, max: 15 }, { min: 4, max: 30 }, category)

        const res = await API.putRequest(`${APIRoutes.Notes}/${createdNote.id}`, {...updatedNote, id: createdNote.id, completed: false}, authUser.token)
        const {data} = await res.json()
        expect(res.status()).toBe(200)
        expect(data).toEqual(expect.objectContaining({
            id: createdNote.id,
            title: updatedNote.title,
            description: updatedNote.description,
            completed: false,
            category: updatedNote.category
        }))
    }
})

test("Update a category of existing note", async({API, authUser}) => {
    const CATEGORIES = ['Home', 'Work', 'Personal']
    for(let i = 0; i < CATEGORIES.length; i++) {
        const note = generateNote({ min: 4, max: 15 }, { min: 4, max: 30 }, CATEGORIES[i]);
        const createdNote = await createNote(API, authUser.token, note)
        
        const newCategoryIndex = (i + 1) % CATEGORIES.length
        const updatedNote = generateNote({ min: 4, max: 15 }, { min: 4, max: 30 }, CATEGORIES[newCategoryIndex])
        
        const res = await API.putRequest(`${APIRoutes.Notes}/${createdNote.id}`, {...updatedNote, id: createdNote.id, completed: false}, authUser.token)
        const {data} = await res.json()
        expect(res.status()).toBe(200)
        expect(data).toEqual(expect.objectContaining({
            id: createdNote.id,
            category: updatedNote.category
        }))
    }
})

test("Update a completed status of existing note", async({API, authUser}) => {
    const CATEGORIES = ['Home', 'Work', 'Personal']
    for(const category of CATEGORIES) {
        const note = generateNote({ min: 4, max: 15 }, { min: 4, max: 30 }, category);
        const createdNote = await createNote(API, authUser.token, note)

        let updatedNote

        await test.step("Change a status of existing note to 'TRUE'", async() => {
            const res = await API.putRequest(`${APIRoutes.Notes}/${createdNote.id}`, {...createdNote, completed: true}, authUser.token)
            const {data} = await res.json()
            expect(res.status()).toBe(200)
            expect(data).toEqual(expect.objectContaining({
                completed: true
            }))
            updatedNote = data
        })
        
        await test.step("Change a  status of existing note to 'FALSE'", async() => {
            console.log(updatedNote.completed)
            const res = await API.putRequest(`${APIRoutes.Notes}/${createdNote.id}`, {...updatedNote, completed: false}, authUser.token)
            const {data} = await res.json()
            expect(res.status()).toBe(200)
            expect(data).toEqual(expect.objectContaining({
                completed: false
            }))
        })
    }
})

test("Update an existing note with an incorrect data", async({API, authUser}) => {
    const CATEGORIES = ['Home', 'Work', 'Personal']
    for(const category of CATEGORIES) {
        const note = generateNote({ min: 4, max: 15 }, { min: 4, max: 30 }, category);
        const createdNote = await createNote(API, authUser.token, note)
        
        await test.step("Update an existing note without title", async() => {
            const updatedNote = generateNote(undefined, { min: 4, max: 30 }, category)
            const res = await API.putRequest(`${APIRoutes.Notes}/${createdNote.id}`, {...updatedNote, id: createdNote.id, completed: false}, authUser.token)
            expect(res.status()).toBe(400)
        })

        await test.step("Update an existing note without description", async() => {
            const updatedNote = generateNote({ min: 4, max: 15 }, undefined, category)
            const res = await API.putRequest(`${APIRoutes.Notes}/${createdNote.id}`, {...updatedNote, id: createdNote.id, completed: false}, authUser.token)
            expect(res.status()).toBe(400)
        })

        await test.step("Update an existing note without completed status", async() => {
            const updatedNote = generateNote({ min: 4, max: 15 }, { min: 4, max: 30 }, category)
            const res = await API.putRequest(`${APIRoutes.Notes}/${createdNote.id}`, {...updatedNote, id: createdNote.id}, authUser.token)
            expect(res.status()).toBe(400)
        })

        await test.step("Update an existing note without note id", async() => {
            const updatedNote = generateNote({ min: 4, max: 15 }, { min: 4, max: 30 }, category)
            const res = await API.putRequest(`${APIRoutes.Notes}/${createdNote.id}`, {...updatedNote}, authUser.token)
            expect(res.status()).toBe(400)
        })

        await test.step("Update an existing note without category", async() => {
            const updatedNote = generateNote({ min: 4, max: 15 }, { min: 4, max: 30 }, undefined)
            const res = await API.putRequest(`${APIRoutes.Notes}/${createdNote.id}`, {...updatedNote}, authUser.token)
            expect(res.status()).toBe(400)
        })
    }
})