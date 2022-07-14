import { UserType } from "./UsersActionTypes";

export enum ELogin {
  SUCCESS = "LOGIN_SUCCESS",
  LOADING = "LOGIN_LOADING",
  FAIL = "LOGIN_FAIL",
  ERROR = "LOGIN_ERROR",
  LOGOUT = "LOGIN_LOGOUT",

  LOGIN_BY_ID_SUCCESS = "LOGIN_BY_ID_SUCCESS",
  LOGIN_BY_ID_LOADING = "LOGIN_BY_ID_LOADING",
  LOGIN_BY_ID_ERROR = "LOGIN_BY_ID_ERROR",
}

export interface ILoginSuccess {
  type: typeof ELogin.SUCCESS;
  payload: any;
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

export interface ILoginByIdSuccess {
  type: typeof ELogin.LOGIN_BY_ID_SUCCESS;
  payload: UserType;
}

export interface ILoginByIdLoading {
  type: typeof ELogin.LOGIN_BY_ID_LOADING;
}

export interface ILoginByIdError {
  type: typeof ELogin.LOGIN_BY_ID_ERROR;
  error: Error;
}

export type ILoginDispatchTypes =
  | ILoginSuccess
  | ILoginLoading
  | ILoginFail
  | ILoginError
  | ILogout
  | ILoginByIdSuccess
  | ILoginByIdLoading
  | ILoginByIdError;
