import {authClient as test} from '../../lib/fixtures/auth.setup'
import { expect} from '@playwright/test'
import {UserAPIRoutes} from '../../lib/utils/APIRoutes'

// import MailosaurClient from "mailosaur";
// const mailosaur = new MailosaurClient('');
// const serverId = 'i6yxxaye'

// Messages aren't sending from practice.expandtesting. So, it's not possible to check reset password token's cases for now

test("[POST] Sends a password reset link to the user's email address, allowing them to reset their password", async({API, authUser}) => {
    const res = await API.postRequest(UserAPIRoutes.ForgotPassword, {email: authUser.email})
    const resBody = await res.json()
    // const email = await mailosaur.messages.get(serverId, {sentTo: authUser.email})
 
    expect(res.status()).toBe(200)
    expect(resBody.message).toBe(`Password reset link successfully sent to ${authUser.email}. Please verify by clicking on the given link`)
})

