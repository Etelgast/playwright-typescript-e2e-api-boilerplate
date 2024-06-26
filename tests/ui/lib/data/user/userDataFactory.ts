import { IUserData } from "../../types/user";

export default abstract class UserDataFactory {
  abstract create(): IUserData;
}
