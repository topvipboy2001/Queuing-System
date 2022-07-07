import { Timestamp } from "firebase/firestore";

export enum EProviders {
  GET_LOADING = "PROVIDERS_GET_LOADING",
  GET_SUCCESS = "PROVIDERS_GET_SUCCESS",
  GET_ERROR = "PROVIDERS_GET_ERROR",

  GET_BY_ID_LOADING = "PROVIDERS_GET_BY_ID_LOADING",
  GET_BY_ID_SUCCESS = "PROVIDERS_GET_BY_ID_SUCCESS",
  GET_BY_ID_ERROR = "PROVIDERS_GET_BY_ID_ERROR",

  ADD_LOADING = "PROVIDERS_ADD_LOADING",
  ADD_SUCCESS = "PROVIDERS_ADD_SUCCESS",
  ADD_ERROR = "PROVIDERS_ADD_ERROR",
}

export type ProviderType = {
  id: string;
  customerName: string;
  dateValid: Timestamp;
  dateProvider: Timestamp;
  email: string;
  ordinalNumber: number;
  phoneNumber: string;
  services: any;
  sourceProvider: any;
  status: number;
};

export interface ProvidersGetLoading {
  type: typeof EProviders.GET_LOADING;
}

export interface ProvidersGetError {
  type: typeof EProviders.GET_ERROR;
  error: Error;
}

export interface ProvidersGetSuccess {
  type: typeof EProviders.GET_SUCCESS;
  payload: ProviderType[];
}

export interface ProvidersGetByIdLoading {
  type: typeof EProviders.GET_BY_ID_LOADING;
}

export interface ProvidersGetByIdError {
  type: typeof EProviders.GET_BY_ID_ERROR;
  error: Error;
}

export interface ProvidersGetByIdSuccess {
  type: typeof EProviders.GET_BY_ID_SUCCESS;
  payload: ProviderType;
}

export interface ProvidersAddLoading {
  type: typeof EProviders.ADD_LOADING;
}

export interface ProvidersAddError {
  type: typeof EProviders.ADD_ERROR;
  error: Error;
}

export interface ProvidersAddSuccess {
  type: typeof EProviders.ADD_SUCCESS;
  payload: ProviderType;
}

export type ProvidersDispatchType =
  | ProvidersGetLoading
  | ProvidersGetError
  | ProvidersGetSuccess
  | ProvidersGetByIdLoading
  | ProvidersGetByIdError
  | ProvidersGetByIdSuccess
  | ProvidersAddLoading
  | ProvidersAddError
  | ProvidersAddSuccess;
