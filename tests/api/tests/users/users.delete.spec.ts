import {authClient as test} from '../../lib/fixtures/auth.setup'
import { expect} from '@playwright/test'
import {APIRoutes, UserAPIRoutes} from '../../lib/utils/APIRoutes'


test.describe("[DELETE] Delete operations with users", async() => {
    test("[DELETE] Log out the currently authenticated user by invalidating their token.", async({API, authUser}) => {
        const responseDelete = await API.deleteRequest(UserAPIRoutes.Logout, authUser.token)
        const responseGetAllNotes = await API.getRequest(APIRoutes.Notes, authUser.token)
    
        expect(responseDelete.status()).toBe(200)
        expect(responseGetAllNotes.status()).toBe(401)
    })
    
    test("[DELETE] Log out the currently authenticated user without authentication token", async({API}) => {
        const res = await API.deleteRequest(UserAPIRoutes.Logout, undefined)
        expect(res.status()).toBe(401)
    })

    test("[DELETE] Delete the authenticated user account", async({API, authUser}) => {
        const resDelete = await API.deleteRequest(UserAPIRoutes.DeleteAccount, authUser.token)
        const resGetAllNotes = await API.getRequest(APIRoutes.Notes, authUser.token)

        expect(resDelete.status()).toBe(200)
        expect(resGetAllNotes.status()).toBe(401)
    })
})
