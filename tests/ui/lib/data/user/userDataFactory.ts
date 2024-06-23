import { IUserData, IUserDataConditioned } from "../../types/user";

export default abstract class UserDataFactory {
  abstract create(): IUserData;
}
