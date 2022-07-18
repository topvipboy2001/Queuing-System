import { Timestamp } from "firebase/firestore";
import { Moment } from "moment";

export enum EReports {
  GET_LOADING = "REPORTS_GET_LOADING",
  GET_SUCCESS = "REPORTS_GET_SUCCESS",
  GET_ERROR = "REPORTS_GET_ERROR",

  GET_WITH_FILTER_LOADING = "REPORTS_GET_WITH_FILTER_LOADING",
  GET_WITH_FILTER_SUCCESS = "REPORTS_GET_WITH_FILTER_SUCCESS",
  GET_WITH_FILTER_ERROR = "REPORTS_GET_WITH_FILTER_ERROR",
}

export type ReportsType = {
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

export type ReportFilterType = {
  dateRange: [Moment, Moment];
};

export interface IReportGetLoading {
  type: typeof EReports.GET_LOADING;
}

export interface IReportGetError {
  type: typeof EReports.GET_ERROR;
  error: Error;
}

export interface IReportGetSuccess {
  type: typeof EReports.GET_SUCCESS;
  payload: ReportsType[];
}

export interface IReportGetWithFilterLoading {
  type: typeof EReports.GET_WITH_FILTER_LOADING;
}

export interface IReportGetWithFilterError {
  type: typeof EReports.GET_WITH_FILTER_ERROR;
  error: Error;
}

export interface IReportGetWithFilterSuccess {
  type: typeof EReports.GET_WITH_FILTER_SUCCESS;
  payload: ReportsType[];
}

export type ReportDispatchType =
  | IReportGetLoading
  | IReportGetError
  | IReportGetSuccess
  | IReportGetWithFilterLoading
  | IReportGetWithFilterError
  | IReportGetWithFilterSuccess;
