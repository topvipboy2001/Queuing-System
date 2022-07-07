import { Timestamp } from "firebase/firestore";

export enum EReports {
  GET_LOADING = "REPORTS_GET_LOADING",
  GET_SUCCESS = "REPORTS_GET_SUCCESS",
  GET_ERROR = "REPORTS_GET_ERROR",
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

export type IReportDispatchType =
  | IReportGetLoading
  | IReportGetError
  | IReportGetSuccess;
