import { API as base } from './api.requests'
import { user } from '../data/user'
import { UserAPIRoutes } from '../utils/APIRoutes'


export const authClient = base.extend({
    authUser: async({API}, use) => {
        const {email, name, password} = user
        await API.postRequest(UserAPIRoutes.Register, {email, name, password})

        const loginResponse = await API.postRequest(UserAPIRoutes.Login, {email, password})
        const {data} = await loginResponse.json()
        const token = data.token
        const authUser = {...user, token}
        await use(authUser)
    }
})