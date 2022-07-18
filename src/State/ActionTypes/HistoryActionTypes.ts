import { Timestamp } from "firebase/firestore";
import { Moment } from "moment";

export enum EHistory {
  GET_LOADING = "HISTORY_GET_LOADING",
  GET_SUCCESS = "HISTORY_GET_SUCCESS",
  GET_ERROR = "HISTORY_GET_ERROR",

  GET_WITH_FILTER_LOADING = "HISTORY_GET_WITH_FILTER_LOADING",
  GET_WITH_FILTER_SUCCESS = "HISTORY_GET_WITH_FILTER_SUCCESS",
  GET_WITH_FILTER_ERROR = "HISTORY_GET_WITH_FILTER_ERROR",
}

export type HistoryType = {
  id: string;
  IPAddress: string;
  content: string;
  documentInteracted: any;
  timeInteract: Timestamp;
  user: any;
};

export type HistoryFilterType = {
  dateRange: [Moment, Moment];
  search: string;
};

export interface IHistoryGetLoading {
  type: typeof EHistory.GET_LOADING;
}

export interface IHistoryGetError {
  type: typeof EHistory.GET_ERROR;
  error: Error;
}

export interface IHistoryGetSuccess {
  type: typeof EHistory.GET_SUCCESS;
  payload: HistoryType[];
}

export interface IHistoryGetWithFilterLoading {
  type: typeof EHistory.GET_WITH_FILTER_LOADING;
}

export interface IHistoryGetWithFilterError {
  type: typeof EHistory.GET_WITH_FILTER_ERROR;
  error: Error;
}

export interface IHistoryGetWithFilterSuccess {
  type: typeof EHistory.GET_WITH_FILTER_SUCCESS;
  payload: HistoryType[];
}

export type HistoryDispatchType =
  | IHistoryGetLoading
  | IHistoryGetError
  | IHistoryGetSuccess
  | IHistoryGetWithFilterLoading
  | IHistoryGetWithFilterError
  | IHistoryGetWithFilterSuccess;
