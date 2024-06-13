import { faker } from '@faker-js/faker';

interface IUser {
    email: string,
    name: string,
    password: string
}

export const user: IUser = {
    email: faker.string.hexadecimal({length: {min: 2, max: 15}}) + '@i6yxxaye.mailosaur.net',
    name: faker.internet.userName(),
    password: faker.internet.password()
}