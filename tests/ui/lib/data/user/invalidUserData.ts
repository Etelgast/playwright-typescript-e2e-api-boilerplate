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
    const { emailCondition, passwordCondition, isConfirmPasswordDifferent } = this.conditions;
    const password = faker.internet.password(passwordCondition.options)
    const confirmPassword = isConfirmPasswordDifferent ? faker.internet.password() : password
    return {
      email: emailCondition.isCorrectSchema
        ? faker.internet.email()
        : faker.internet.userAgent(),
      name: faker.internet.userName(),
      password,
      confirmPassword
    };
  }

  updatePasswordLength(length: number) {
    if (this.conditions.passwordCondition.options) {
      this.conditions.passwordCondition.options.length = length;
    }
  }

  changeConfirmPassword() {
    this.conditions.isConfirmPasswordDifferent = !this.conditions.isConfirmPasswordDifferent
  }
}
