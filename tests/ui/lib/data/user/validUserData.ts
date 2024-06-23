import { faker } from "@faker-js/faker";
import { IUserData } from "../../types/user";
import UserDataFactory from "./userDataFactory";

export default class ValidUserData extends UserDataFactory {
  create(): IUserData {
    const email = faker.internet.email();
    const name = faker.internet.userName();
    const password = faker.internet.password();
    const confirmPassword = password;
    return {
      email,
      name,
      password,
      confirmPassword,
    };
  }
}
