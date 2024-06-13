import { faker } from '@faker-js/faker';
import { IGeneratedRegistrationForm } from '../../types/generator';

interface IRegistrationForm {
    passwordSize?: number,
    confirmPasswordIsDifferent?: boolean
}

export const createRegistrationFormData = (testingData: IRegistrationForm): IGeneratedRegistrationForm => {
    const email = faker.internet.email()
    const name = faker.internet.userName()
    const password = faker.internet.password({length: testingData.passwordSize})
    return {
        email,
        name,
        password,
        confirmPassword: testingData.confirmPasswordIsDifferent ? faker.internet.password() : password
    }
}