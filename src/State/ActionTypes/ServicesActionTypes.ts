import { Moment } from "moment";

export enum EServices {
  GET_LOADING = "SERVICES_GET_LOADING",
  GET_SUCCESS = "SERVICES_GET_SUCCESS",
  GET_ERROR = "SERVICES_GET_ERROR",

  GET_BY_ID_LOADING = "SERVICES_GET_BY_ID_LOADING",
  GET_BY_ID_SUCCESS = "SERVICES_GET_BY_ID_SUCCESS",
  GET_BY_ID_ERROR = "SERVICES_GET_BY_ID_ERROR",

  GET_BY_FILTER_LOADING = "SERVICES_GET_BY_FILTER_LOADING",
  GET_BY_FILTER_SUCCESS = "SERVICES_GET_BY_FILTER_SUCCESS",
  GET_BY_FILTER_ERROR = "SERVICES_GET_BY_FILTER_ERROR",

  UPDATE_BY_ID_LOADING = "SERVICES_UPDATE_BY_ID_LOADING",
  UPDATE_BY_ID_SUCCESS = "SERVICES_UPDATE_BY_ID_SUCCESS",
  UPDATE_BY_ID_ERROR = "SERVICES_UPDATE_BY_ID_ERROR",

  ADD_LOADING = "SERVICES_ADD_LOADING",
  ADD_SUCCESS = "SERVICES_ADD_SUCCESS",
  ADD_ERROR = "SERVICES_ADD_ERROR",
  ADD_FAIL = "SERVICES_ADD_FAIL",
}

export type ServiceType = {
  id: string;
  name: string;
  description: string;
  isReset: boolean;
  surfix: number;
  prefix: number;
  increase: { from: number; to: number };
  isActive: boolean;
};

export type ServiceFilterType = {
  isActive: boolean | null;
  dateRange: [Moment, Moment];
  search: string;
};

export type ServiceAddType = {
  id: string;
  name: string;
  description: string;
  isReset: boolean;
  surfix: number;
  prefix: number;
  increase: { from: number; to: number };
};

export type ServiceUpdateType = {
  id: string;
  name: string;
  description?: string;
  isReset?: boolean;
  surfix?: number;
  prefix?: number;
  increase?: { from?: number; to?: number };
};

export interface IServicesGetLoading {
  type: typeof EServices.GET_LOADING;
}

export interface IServicesGetError {
  type: typeof EServices.GET_ERROR;
  error: Error;
}

export interface IServicesGetSuccess {
  type: typeof EServices.GET_SUCCESS;
  payload: ServiceType[];
}

export interface IServiceGetByIdLoading {
  type: typeof EServices.GET_BY_ID_LOADING;
}

export interface IServiceGetByIdError {
  type: typeof EServices.GET_BY_ID_ERROR;
  error: Error;
}

export interface IServiceGetByIdSuccess {
  type: typeof EServices.GET_BY_ID_SUCCESS;
  payload: ServiceType;
}

export interface IServiceGetByFilterLoading {
  type: typeof EServices.GET_BY_FILTER_LOADING;
}

export interface IServiceGetByFilterError {
  type: typeof EServices.GET_BY_FILTER_ERROR;
  error: Error;
}

export interface IServiceGetByFilterSuccess {
  type: typeof EServices.GET_BY_FILTER_SUCCESS;
  payload: ServiceType[];
}

export interface ServiceUpdateByIdLoading {
  type: typeof EServices.UPDATE_BY_ID_LOADING;
}

export interface ServiceUpdateByIdError {
  type: typeof EServices.UPDATE_BY_ID_ERROR;
  error: Error;
}

export interface ServiceUpdateByIdSuccess {
  type: typeof EServices.UPDATE_BY_ID_SUCCESS;
  payload: ServiceType;
}

export interface ServiceAddLoading {
  type: typeof EServices.ADD_LOADING;
}

export interface ServiceAddError {
  type: typeof EServices.ADD_ERROR;
  error: Error;
}

export interface ServiceAddSuccess {
  type: typeof EServices.ADD_SUCCESS;
  payload: ServiceType;
}

export type ServiceDispatchType =
  | IServicesGetLoading
  | IServicesGetError
  | IServicesGetSuccess
  | ServiceAddLoading
  | ServiceAddError
  | ServiceAddSuccess
  | IServiceGetByIdLoading
  | IServiceGetByIdError
  | IServiceGetByIdSuccess
  | ServiceUpdateByIdLoading
  | ServiceUpdateByIdError
  | ServiceUpdateByIdSuccess
  | IServiceGetByFilterLoading
  | IServiceGetByFilterError
  | IServiceGetByFilterSuccess;
