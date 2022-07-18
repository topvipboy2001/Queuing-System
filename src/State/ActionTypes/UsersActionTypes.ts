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

  GET_BY_FILTER_LOADING = "USER_GET_BY_FILTER_LOADING",
  GET_BY_FILTER_SUCCESS = "USER_GET_BY_FILTER_SUCCESS",
  GET_BY_FILTER_ERROR = "USER_GET_BY_FILTER_ERROR",

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

export type UserFilterType = {
  role: string;
  search: string;
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

export interface IUserAddLoading {
  type: typeof EUser.ADD_LOADING;
}

export interface IUserAddError {
  type: typeof EUser.ADD_ERROR;
  error: Error;
}

export interface IUserAddSuccess {
  type: typeof EUser.ADD_SUCCESS;
  payload: UserType;
}

export interface IUserAddFail {
  type: typeof EUser.ADD_FAIL;
  message: string;
}

export interface IUserGetLoading {
  type: typeof EUser.GET_LOADING;
}

export interface IUserGetError {
  type: typeof EUser.GET_ERROR;
  error: Error;
}

export interface IUserGetSuccess {
  type: typeof EUser.GET_SUCCESS;
  payload: UserType[];
}

export interface IUserGetByIdLoading {
  type: typeof EUser.GET_BY_ID_LOADING;
}

export interface IUserGetByIdError {
  type: typeof EUser.GET_BY_ID_ERROR;
  error: Error;
}

export interface IUserGetByIdSuccess {
  type: typeof EUser.GET_BY_ID_SUCCESS;
  payload: UserType;
}

export interface IUserUpdateByIdLoading {
  type: typeof EUser.UPDATE_BY_ID_LOADING;
}

export interface IUserUpdateByIdError {
  type: typeof EUser.UPDATE_BY_ID_ERROR;
  error: Error;
}

export interface IUserUpdateByIdSuccess {
  type: typeof EUser.UPDATE_BY_ID_SUCCESS;
  payload: UserType;
}

export interface IUserGetByFilterLoading {
  type: typeof EUser.GET_BY_FILTER_LOADING;
}

export interface IUserGetByFilterError {
  type: typeof EUser.GET_BY_FILTER_ERROR;
  error: Error;
}

export interface IUserGetByFilterSuccess {
  type: typeof EUser.GET_BY_FILTER_SUCCESS;
  payload: UserType[];
}

export type UserDispatchType =
  | IUserAddLoading
  | IUserAddError
  | IUserAddSuccess
  | IUserGetLoading
  | IUserGetError
  | IUserGetSuccess
  | IUserAddFail
  | IUserGetByIdLoading
  | IUserGetByIdError
  | IUserGetByIdSuccess
  | IUserUpdateByIdLoading
  | IUserUpdateByIdError
  | IUserUpdateByIdSuccess
  | IUserGetByFilterLoading
  | IUserGetByFilterError
  | IUserGetByFilterSuccess;
