export enum ERole {
  ADD_LOADING = "ROLE_ADD_LOADING",
  ADD_SUCCESS = "ROLE_ADD_SUCCESS",
  ADD_ERROR = "ROLE_ADD_ERROR",

  GET_LOADING = "ROLE_GET_LOADING",
  GET_SUCCESS = "ROLE_GET_SUCCESS",
  GET_ERROR = "ROLE_GET_ERROR",
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
