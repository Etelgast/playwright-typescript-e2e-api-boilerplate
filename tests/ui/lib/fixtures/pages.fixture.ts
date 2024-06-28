import { APIRequest, APIRequestContext, Fixtures } from "@playwright/test";
import { WelcomePage } from "../../pages/WelcomePage";
import { ContextPagesFixture } from "./context-pages";
import { RegisterPage } from "../../pages/RegisterPage";
import { LoginPage } from "../../pages/LoginPage";
import { user } from "../../../api/lib/data/user";
import { UserAPIRoutes } from "../../../api/lib/utils/APIRoutes";
import { NotesPage } from "../../pages/NotesPage";
import { AuthUser, RegisteredUser } from "../types/user";

export type NotesPagesFixture = {
  welcomePage: WelcomePage;
  registerPage: RegisterPage;
  loginPage: LoginPage;
  notesPage: NotesPage;
  registeredUser: RegisteredUser;
  authUser: AuthUser
  request: APIRequestContext;
};

const createUser = async({request}): Promise<RegisteredUser | never> => {
  const { email, name, password } = user;
  try {
    await request.post("/notes/api" + UserAPIRoutes.Register, { data: email, name, password });
    return {email, name, password}
  } catch (error) {
    throw new Error(error);
  }
}

const createAuthUser = async({request}, createdUser: RegisteredUser): Promise<string | never> => {
  try {
    const res = await request.post("/notes/api" + UserAPIRoutes.Login, {data: createdUser})
    const {data} = await res.json()
    return data.token
  } catch (error) {
    throw new Error(error);
  }
}

export const notesPagesFixture: Fixtures<
  NotesPagesFixture,
  ContextPagesFixture
> = {
  welcomePage: async ({ contextPage }, use) => {
    const welcomePage = new WelcomePage(contextPage);
    await use(welcomePage);
  },
  registerPage: async ({ contextPage }, use) => {
    const registerPage = new RegisterPage(contextPage);
    await use(registerPage);
  },
  loginPage: async ({ contextPage }, use) => {
    const loginPage = new LoginPage(contextPage);
    await use(loginPage);
  },
  notesPage: async ({ contextPage }, use) => {
    const notesPage = new NotesPage(contextPage);
    await use(notesPage);
  },
  registeredUser: async ({ request }, use) => {
    const registeredUser = await createUser({request})
    await use(registeredUser)
  },
  authUser: async({request}, use) => {
    const registeredUser = await createUser({request})
    const token = await createAuthUser({request}, registeredUser)
    const authUser = {...registeredUser, token}
    await use(authUser)
  }
};
