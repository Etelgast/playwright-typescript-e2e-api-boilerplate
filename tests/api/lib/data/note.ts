import { faker } from "@faker-js/faker";

interface IData {
    titleLength: {min: number, max: number} | undefined,
    descriptionLength: {min: number, max: number} | undefined,
    category: string | undefined
}

export const generateNote = (titleLength: IData['titleLength'], descriptionLength: IData['descriptionLength'], category: IData['category']) => {
    return {
        title: titleLength !== undefined ? faker.lorem.word({ length: { min: titleLength.min, max: titleLength.max }}) : undefined,
        description: descriptionLength !== undefined ? faker.lorem.words(descriptionLength) : undefined,
        category
    }
}