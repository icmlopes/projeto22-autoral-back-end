export type ApplicationError = {
    name: string;
    message: string;
  };

  export type UserRegister = {
    email: string;
    password: string;
    confirmPassword: string;
    userType: string;
  };

  export type LawyerEnroll = {
    name: string,
    barNumberId: number,
    userId: number,
  }