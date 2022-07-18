export enum ERole {
  ADD_LOADING = "ROLE_ADD_LOADING",
  ADD_SUCCESS = "ROLE_ADD_SUCCESS",
  ADD_ERROR = "ROLE_ADD_ERROR",

  GET_LOADING = "ROLE_GET_LOADING",
  GET_SUCCESS = "ROLE_GET_SUCCESS",
  GET_ERROR = "ROLE_GET_ERROR",

  GET_BY_ID_LOADING = "ROLE_GET_BY_ID_LOADING",
  GET_BY_ID_SUCCESS = "ROLE_GET_BY_ID_SUCCESS",
  GET_BY_ID_ERROR = "ROLE_GET_BY_ID_ERROR",

  GET_BY_FILTER_LOADING = "ROLE_GET_BY_FILTER_LOADING",
  GET_BY_FILTER_SUCCESS = "ROLE_GET_BY_FILTER_SUCCESS",
  GET_BY_FILTER_ERROR = "ROLE_GET_BY_FILTER_ERROR",

  UPDATE_BY_ID_LOADING = "ROLE_UPDATE_BY_ID_LOADING",
  UPDATE_BY_ID_SUCCESS = "ROLE_UPDATE_BY_ID_SUCCESS",
  UPDATE_BY_ID_ERROR = "ROLE_UPDATE_BY_ID_ERROR",
}

export type RoleType = {
  id: string;
  name: string;
  description: string;
  authority: string[];
  amountOfUser: number;
};

export type RoleFilterType = {
  search: string;
};

export type RoleAddType = {
  name: string;
  description: string;
  authority: string[];
};

export interface IRoleAddLoading {
  type: typeof ERole.ADD_LOADING;
}

export interface IRoleAddError {
  type: typeof ERole.ADD_ERROR;
  error: Error;
}

export interface IRoleAddSuccess {
  type: typeof ERole.ADD_SUCCESS;
  payload: RoleType;
}

export interface IRoleGetLoading {
  type: typeof ERole.GET_LOADING;
}

export interface IRoleGetError {
  type: typeof ERole.GET_ERROR;
  error: Error;
}

export interface IRoleGetSuccess {
  type: typeof ERole.GET_SUCCESS;
  payload: RoleType[];
}

export interface IRoleGetByIdLoading {
  type: typeof ERole.GET_BY_ID_LOADING;
}

export interface IRoleGetByIdError {
  type: typeof ERole.GET_BY_ID_ERROR;
  error: Error;
}

export interface IRoleGetByIdSuccess {
  type: typeof ERole.GET_BY_ID_SUCCESS;
  payload: RoleType;
}

export interface IRoleUpdateByIdLoading {
  type: typeof ERole.UPDATE_BY_ID_LOADING;
}

export interface IRoleUpdateByIdError {
  type: typeof ERole.UPDATE_BY_ID_ERROR;
  error: Error;
}

export interface IRoleUpdateByIdSuccess {
  type: typeof ERole.UPDATE_BY_ID_SUCCESS;
  payload: RoleType;
}

export interface IRoleGetByFilterLoading {
  type: typeof ERole.GET_BY_FILTER_LOADING;
}

export interface IRoleGetByFilterError {
  type: typeof ERole.GET_BY_FILTER_ERROR;
  error: Error;
}

export interface IRoleGetByFilterSuccess {
  type: typeof ERole.GET_BY_FILTER_SUCCESS;
  payload: RoleType[];
}

export type RoleDispatchType =
  | IRoleAddLoading
  | IRoleAddError
  | IRoleAddSuccess
  | IRoleGetLoading
  | IRoleGetError
  | IRoleGetSuccess
  | IRoleGetByIdLoading
  | IRoleGetByIdError
  | IRoleGetByIdSuccess
  | IRoleUpdateByIdLoading
  | IRoleUpdateByIdError
  | IRoleUpdateByIdSuccess
  | IRoleGetByFilterLoading
  | IRoleGetByFilterError
  | IRoleGetByFilterSuccess;
