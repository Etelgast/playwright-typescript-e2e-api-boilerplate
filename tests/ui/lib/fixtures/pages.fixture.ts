import { APIRequest, APIRequestContext, Fixtures } from "@playwright/test"
import { WelcomePage } from "../../pages/WelcomePage"
import { ContextPagesFixture } from "./context-pages"
import { RegisterPage } from "../../pages/RegisterPage"
import { LoginPage } from "../../pages/LoginPage"
import { user } from "../../../api/lib/data/user"
import { UserAPIRoutes } from "../../../api/lib/utils/APIRoutes"
import { SetupFixture } from "./setup.fixtures"
import { NotesPage } from "../../pages/NotesPage"


export type NotesPagesFixture = {
    welcomePage: WelcomePage
    registerPage: RegisterPage
    loginPage: LoginPage
    notesPage: NotesPage
    registeredUser: RegisteredUser
    request: APIRequestContext
}

type RegisteredUser = {
    email: string;
    name: string;
    password: string;
}

export const notesPagesFixture: Fixtures<NotesPagesFixture, ContextPagesFixture> = {
    welcomePage: async({contextPage}, use) => {
        const welcomePage = new WelcomePage(contextPage)
        await use(welcomePage)
    },
    registerPage: async({contextPage}, use) => {
        const registerPage = new RegisterPage(contextPage)
        await use(registerPage)
    },
    loginPage: async({contextPage}, use) => {
        const loginPage = new LoginPage(contextPage)
        await use(loginPage)
    },
    notesPage: async({contextPage}, use) => {
        const notesPage = new NotesPage(contextPage)
        await use(notesPage)
    },
    registeredUser: async({request}, use) => {
        const {email, name, password} = user
        try {
            await request.post("/notes/api" + UserAPIRoutes.Register, {data: {email, name, password}})
            const registeredUser = {email, name, password}
            await use(registeredUser)
        } catch (error) {
            throw new Error(error)
        }
    }
}