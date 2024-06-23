import { faker } from "@faker-js/faker";
import { IUserData, IUserDataConditioned } from "../../types/user";
import UserDataFactory from "./userDataFactory";

export default class InvalidUserData extends UserDataFactory {
  private conditions: IUserDataConditioned;

  constructor(conditions: IUserDataConditioned) {
    super();
    this.conditions = conditions;
  }

  create(): IUserData {
    const { email, password, name } = this.conditions;
    return {
      email: email.isCorrectSchema
        ? faker.internet.email()
        : faker.internet.userAgent(),
      name: faker.internet.userName(),
      password: faker.internet.password(password.options),
    };
  }

  updatePasswordLength(length: number) {
    if (this.conditions.password.options) {
      this.conditions.password.options.length = length;
    }
  }
}
