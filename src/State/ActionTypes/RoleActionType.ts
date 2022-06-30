export enum ERole {
  ADD_LOADING = "ADD_LOADING",
  ADD_SUCCESS = "ADD_SUCCESS",
  ADD_ERROR = "ADD_ERROR",

  GET_LOADING = "GET_LOADING",
  GET_SUCCESS = "GET_SUCCESS",
  GET_ERROR = "GET_ERROR",
}

export type RoleType = {
  id: string;
  name: string;
  description: string;
  authority: string[];
  amountOfUser: number;
};

export type RoleAddType = {
  name: string;
  description: string;
  authority: string[];
};

export interface RoleAddLoading {
  type: typeof ERole.ADD_LOADING;
}

export interface RoleAddError {
  type: typeof ERole.ADD_ERROR;
  error: Error;
}

export interface RoleAddSuccess {
  type: typeof ERole.ADD_SUCCESS;
  payload: RoleType;
}

export interface RoleGetLoading {
  type: typeof ERole.GET_LOADING;
}

export interface RoleGetError {
  type: typeof ERole.GET_ERROR;
  error: Error;
}

export interface RoleGetSuccess {
  type: typeof ERole.GET_SUCCESS;
  payload: RoleType[];
}

export type RoleDispatchType =
  | RoleAddLoading
  | RoleAddError
  | RoleAddSuccess
  | RoleGetLoading
  | RoleGetError
  | RoleGetSuccess;
