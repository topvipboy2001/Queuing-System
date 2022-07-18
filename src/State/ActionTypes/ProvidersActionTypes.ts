import { Timestamp } from "firebase/firestore";
import { Moment } from "moment";

export enum EProviders {
  GET_LOADING = "PROVIDERS_GET_LOADING",
  GET_SUCCESS = "PROVIDERS_GET_SUCCESS",
  GET_ERROR = "PROVIDERS_GET_ERROR",

  GET_NOTIFICATION_LOADING = "PROVIDERS_GET_NOTIFICATION_LOADING",
  GET_NOTIFICATION_SUCCESS = "PROVIDERS_GET_NOTIFICATION_SUCCESS",
  GET_NOTIFICATION_ERROR = "PROVIDERS_GET_NOTIFICATION_ERROR",

  GET_BY_ID_LOADING = "PROVIDERS_GET_BY_ID_LOADING",
  GET_BY_ID_SUCCESS = "PROVIDERS_GET_BY_ID_SUCCESS",
  GET_BY_ID_ERROR = "PROVIDERS_GET_BY_ID_ERROR",

  GET_BY_FILTER_LOADING = "PROVIDERS_GET_BY_FILTER_LOADING",
  GET_BY_FILTER_SUCCESS = "PROVIDERS_GET_BY_FILTER_SUCCESS",
  GET_BY_FILTER_ERROR = "PROVIDERS_GET_BY_FILTER_ERROR",

  GET_BY_SERVICE_ID_ERROR = "PROVIDER_GET_BY_SERVICE_ID_ERROR",
  GET_BY_SERVICE_ID_LOADING = "PROVIDER_GET_BY_SERVICE_ID_LOADING",
  GET_BY_SERVICE_ID_SUCCESS = "PROVIDER_GET_BY_SERVICE_ID_SUCCESS",

  GET_BY_SERVICE_ID_WITH_FILTER_ERROR = "PROVIDER_GET_BY_SERVICE_ID_WITH_FILTER_ERROR",
  GET_BY_SERVICE_ID_WITH_FILTER_LOADING = "PROVIDER_GET_BY_SERVICE_ID_WITH_FILTER_LOADING",
  GET_BY_SERVICE_ID_WITH_FILTER_SUCCESS = "PROVIDER_GET_BY_SERVICE_ID_WITH_FILTER_SUCCESS",

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

export type ProviderFilterType = {
  service: string;
  status: number;
  sourceProvider: string;
  dateRange: [Moment, Moment];
  search: string;
};

export type ProviderFilterGetServiceIDType = {
  status: number;
  dateRange: [Moment, Moment];
  search: string;
};

export type ProviderAddType = {
  service: string;
};

export interface IProvidersGetLoading {
  type: typeof EProviders.GET_LOADING;
}

export interface IProvidersGetError {
  type: typeof EProviders.GET_ERROR;
  error: Error;
}

export interface IProvidersGetSuccess {
  type: typeof EProviders.GET_SUCCESS;
  payload: ProviderType[];
}

export interface IProvidersGetByIdLoading {
  type: typeof EProviders.GET_BY_ID_LOADING;
}

export interface IProvidersGetNotificationError {
  type: typeof EProviders.GET_NOTIFICATION_ERROR;
  error: Error;
}

export interface IProvidersGetNotificationSuccess {
  type: typeof EProviders.GET_NOTIFICATION_SUCCESS;
  notificationPayload: ProviderType[];
}

export interface IProvidersGetNotificationLoading {
  type: typeof EProviders.GET_NOTIFICATION_LOADING;
}

export interface IProvidersGetByIdError {
  type: typeof EProviders.GET_BY_ID_ERROR;
  error: Error;
}

export interface IProvidersGetByIdSuccess {
  type: typeof EProviders.GET_BY_ID_SUCCESS;
  payload: ProviderType;
}

export interface IProvidersGetByFilterLoading {
  type: typeof EProviders.GET_BY_FILTER_LOADING;
}

export interface IProvidersGetByFilterError {
  type: typeof EProviders.GET_BY_FILTER_ERROR;
  error: Error;
}

export interface IProvidersGetByFilterSuccess {
  type: typeof EProviders.GET_BY_FILTER_SUCCESS;
  payload: ProviderType[];
}

export interface IProvidersAddLoading {
  type: typeof EProviders.ADD_LOADING;
}

export interface IProvidersAddError {
  type: typeof EProviders.ADD_ERROR;
  error: Error;
}

export interface IProvidersAddSuccess {
  type: typeof EProviders.ADD_SUCCESS;
  payload: ProviderType;
}

export interface IProvidersGetByServiceIdLoading {
  type: typeof EProviders.GET_BY_SERVICE_ID_LOADING;
}

export interface IProvidersGetByServiceIdError {
  type: typeof EProviders.GET_BY_SERVICE_ID_ERROR;
  error: Error;
}

export interface IProvidersGetByServiceIdSuccess {
  type: typeof EProviders.GET_BY_SERVICE_ID_SUCCESS;
  subPayload: ProviderType[];
}

export interface IProvidersGetByServiceIdWithFilterLoading {
  type: typeof EProviders.GET_BY_SERVICE_ID_WITH_FILTER_LOADING;
}

export interface IProvidersGetByServiceIdWithFilterError {
  type: typeof EProviders.GET_BY_SERVICE_ID_WITH_FILTER_ERROR;
  error: Error;
}

export interface IProvidersGetByServiceIdWithFilterSuccess {
  type: typeof EProviders.GET_BY_SERVICE_ID_WITH_FILTER_SUCCESS;
  subPayload: ProviderType[];
}

export type ProvidersDispatchType =
  | IProvidersGetLoading
  | IProvidersGetError
  | IProvidersGetSuccess
  | IProvidersGetByIdLoading
  | IProvidersGetByIdError
  | IProvidersGetByIdSuccess
  | IProvidersAddLoading
  | IProvidersAddError
  | IProvidersAddSuccess
  | IProvidersGetByServiceIdLoading
  | IProvidersGetByServiceIdError
  | IProvidersGetByServiceIdSuccess
  | IProvidersGetByFilterLoading
  | IProvidersGetByFilterError
  | IProvidersGetByFilterSuccess
  | IProvidersGetNotificationError
  | IProvidersGetNotificationSuccess
  | IProvidersGetNotificationLoading
  | IProvidersGetByServiceIdWithFilterLoading
  | IProvidersGetByServiceIdWithFilterError
  | IProvidersGetByServiceIdWithFilterSuccess;
