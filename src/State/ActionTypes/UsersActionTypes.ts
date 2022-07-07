export enum EUser {
  ADD_LOADING = "USER_ADD_LOADING",
  ADD_SUCCESS = "USER_ADD_SUCCESS",
  ADD_ERROR = "USER_ADD_ERROR",
  ADD_FAIL = "USER_ADD_FAIL",

  GET_LOADING = "USER_GET_LOADING",
  GET_SUCCESS = "USER_GET_SUCCESS",
  GET_ERROR = "USER_GET_ERROR",

  GET_BY_ID_LOADING = "USER_GET_BY_ID_LOADING",
  GET_BY_ID_SUCCESS = "USER_GET_BY_ID_SUCCESS",
  GET_BY_ID_ERROR = "USER_GET_BY_ID_ERROR",

  UPDATE_BY_ID_LOADING = "USER_UPDATE_BY_ID_LOADING",
  UPDATE_BY_ID_SUCCESS = "USER_UPDATE_BY_ID_SUCCESS",
  UPDATE_BY_ID_ERROR = "USER_UPDATE_BY_ID_ERROR",
}

export type UserType = {
  id: string;
  name: string;
  username: string;
  phoneNumber: string;
  email: string;
  role: any;
  isActive: boolean;
  password: string;
};

export type UserAddType = {
  name: string;
  username: string;
  phoneNumber: string;
  password: string;
  email: string;
  role: string;
  isActive: boolean;
};

export type UserUpdateType = {
  name: string;
  username: string;
  phoneNumber: string;
  password: string;
  email: string;
  role: string;
  isActive: boolean;
};

export interface UserAddLoading {
  type: typeof EUser.ADD_LOADING;
}

export interface UserAddError {
  type: typeof EUser.ADD_ERROR;
  error: Error;
}

export interface UserAddSuccess {
  type: typeof EUser.ADD_SUCCESS;
  payload: UserType;
}

export interface UserAddFail {
  type: typeof EUser.ADD_FAIL;
  message: string;
}

export interface UserGetLoading {
  type: typeof EUser.GET_LOADING;
}

export interface UserGetError {
  type: typeof EUser.GET_ERROR;
  error: Error;
}

export interface UserGetSuccess {
  type: typeof EUser.GET_SUCCESS;
  payload: UserType[];
}

export interface UserGetByIdLoading {
  type: typeof EUser.GET_BY_ID_LOADING;
}

export interface UserGetByIdError {
  type: typeof EUser.GET_BY_ID_ERROR;
  error: Error;
}

export interface UserGetByIdSuccess {
  type: typeof EUser.GET_BY_ID_SUCCESS;
  payload: UserType;
}

export interface UserUpdateByIdLoading {
  type: typeof EUser.UPDATE_BY_ID_LOADING;
}

export interface UserUpdateByIdError {
  type: typeof EUser.UPDATE_BY_ID_ERROR;
  error: Error;
}

export interface UserUpdateByIdSuccess {
  type: typeof EUser.UPDATE_BY_ID_SUCCESS;
  payload: UserType;
}

export type UserDispatchType =
  | UserAddLoading
  | UserAddError
  | UserAddSuccess
  | UserGetLoading
  | UserGetError
  | UserGetSuccess
  | UserAddFail
  | UserGetByIdLoading
  | UserGetByIdError
  | UserGetByIdSuccess
  | UserUpdateByIdLoading
  | UserUpdateByIdError
  | UserUpdateByIdSuccess;
