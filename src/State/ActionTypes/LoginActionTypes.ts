export enum ELogin {
  SUCCESS = "LOGIN_SUCCESS",
  LOADING = "LOGIN_LOADING",
  FAIL = "LOGIN_FAIL",
  ERROR = "LOGIN_ERROR",
  LOGOUT = "LOGIN_LOGOUT",
}

export interface ILoginSuccess {
  type: typeof ELogin.SUCCESS;
  user: any;
}

export interface ILoginLoading {
  type: typeof ELogin.LOADING;
}

export interface ILoginFail {
  type: typeof ELogin.FAIL;
  message: string;
}

export interface ILoginError {
  type: typeof ELogin.ERROR;
  error: Error;
}

export interface ILogout {
  type: typeof ELogin.LOGOUT;
}

export type ILoginDispatchTypes =
  | ILoginSuccess
  | ILoginLoading
  | ILoginFail
  | ILoginError
  | ILogout;
