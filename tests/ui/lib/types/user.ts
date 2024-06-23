export interface IUserData {
  email: string;
  name: string;
  password: string;
  confirmPassword?: string;
}

export interface IUserDataCondition {
  isCorrectSchema: boolean;
  options?: {
    length: number;
  };
}

export interface IUserDataConditioned {
  email: IUserDataCondition;
  name: IUserDataCondition;
  password: IUserDataCondition;
}
