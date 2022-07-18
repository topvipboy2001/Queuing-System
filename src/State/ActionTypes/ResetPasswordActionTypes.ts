export enum EResetPassword {
  CONFIRM_EMAIL_SUCCESS = "CONFIRM_EMAIL_SUCCESS",
  CONFIRM_EMAIL_LOADING = "CONFIRM_EMAIL_LOADING",
  CONFIRM_EMAIL_FAIL = "CONFIRM_EMAIL_FAIL",
  CONFIRM_EMAIL_ERROR = "CONFIRM_EMAIL_ERROR",

  CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS",
  CHANGE_PASSWORD_LOADING = "CHANGE_PASSWORD_LOADING",
  CHANGE_PASSWORD_FAIL = "CHANGE_PASSWORD_FAIL",
  CHANGE_PASSWORD_ERROR = "CHANGE_PASSWORD_ERROR",

  CLEAR_CACHE = "CLEAR_CACHE",
}

export interface IResetPasswordConfirmEmailSuccess {
  type: typeof EResetPassword.CONFIRM_EMAIL_SUCCESS;
  userId: string;
  loading: boolean;
}

export interface IResetPasswordConfirmEmailLoading {
  type: typeof EResetPassword.CONFIRM_EMAIL_LOADING;
  loading: boolean;
}

export interface IResetPasswordConfirmEmailFail {
  type: typeof EResetPassword.CONFIRM_EMAIL_FAIL;
  loading: boolean;
  message: string;
}

export interface IResetPasswordConfirmEmailError {
  type: typeof EResetPassword.CONFIRM_EMAIL_ERROR;
  loading: boolean;
  error: Error;
}

export interface IResetPasswordChangePasswordSuccess {
  type: typeof EResetPassword.CHANGE_PASSWORD_SUCCESS;
  loading: boolean;
}

export interface IResetPasswordChangePasswordLoading {
  type: typeof EResetPassword.CHANGE_PASSWORD_LOADING;
  loading: boolean;
}

export interface IResetPasswordChangePasswordFail {
  type: typeof EResetPassword.CHANGE_PASSWORD_FAIL;
  loading: boolean;
  message: string;
}

export interface IResetPasswordChangePasswordError {
  type: typeof EResetPassword.CHANGE_PASSWORD_ERROR;
  loading: boolean;
  error: Error;
}

export interface IResetPasswordClearCache {
  type: typeof EResetPassword.CLEAR_CACHE;
}

export type ConfirmEmailDispatchTypes =
  | IResetPasswordConfirmEmailSuccess
  | IResetPasswordConfirmEmailLoading
  | IResetPasswordConfirmEmailFail
  | IResetPasswordConfirmEmailError
  | IResetPasswordChangePasswordSuccess
  | IResetPasswordChangePasswordLoading
  | IResetPasswordChangePasswordFail
  | IResetPasswordChangePasswordError
  | IResetPasswordClearCache;
