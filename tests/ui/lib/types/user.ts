export interface IUserData {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface IUserDataCondition {
  isCorrectSchema: boolean;
  options?: {
    length: number;
  };
}

export interface IUserDataConditioned {
  emailCondition: IUserDataCondition;
  name: IUserDataCondition;
  passwordCondition: IUserDataCondition;
  isConfirmPasswordDifferent: Boolean
}

export interface RegisteredUser {
  email: string;
  name: string;
  password: string;
};

export interface AuthUser extends RegisteredUser {
  token: string;
}
